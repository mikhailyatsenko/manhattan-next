#!/usr/bin/env bash
set -euo pipefail

# Deploy static site to Beget shared hosting
# - Cleans remote public_html preserving a specific file and folder
# - Uploads local out/ contents excluding prices/
#
# Reads configuration from .env in repo root:
#   BEGET_HOST=mishagke.beget.tech
#   BEGET_USER=mishagke_deploy
#   BEGET_PASS=...                # optional; if absent, SSH key auth is used
#   BEGET_PATH=public_html        # optional; default public_html
#   LOCAL_OUT_DIR=out             # optional; default out
#   PRESERVE_FILE=yandex_b0b5721aa7d481dd.html   # required
#   PRESERVE_DIR=prices                             # required
#   RSYNC_EXTRA=--progress        # optional: additional rsync flags
#
# Usage:
#   bash scripts/deploy_beget.sh           # interactive confirm
#   bash scripts/deploy_beget.sh --yes     # no confirm
#   DRY_RUN=1 bash scripts/deploy_beget.sh # preview rsync only (no remote delete)

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# Load only deployment-related vars from .env to avoid parsing unrelated content.
# We only import variables starting with BEGET_ or PRESERVE_, plus LOCAL_OUT_DIR and RSYNC_EXTRA.
if [[ -f .env ]]; then
  TMP_ENV="tmp_rovodev_env_$$.sh"
  awk 'BEGIN{FS="="}
       /^[[:space:]]*#/ {next}
       /^[[:space:]]*$/ {next}
       /^(BEGET|PRESERVE)_[A-Za-z0-9_]*=/ {print; next}
       /^LOCAL_OUT_DIR=/ {print; next}
       /^RSYNC_EXTRA=/ {print; next}
  ' .env > "$TMP_ENV"
  set -a
  # shellcheck source=/dev/null
  source "$TMP_ENV"
  set +a
  rm -f "$TMP_ENV"
fi

: "${BEGET_HOST:?BEGET_HOST is required (e.g., mishagke.beget.tech)}"
: "${BEGET_USER:?BEGET_USER is required (e.g., mishagke_deploy)}"
BEGET_PATH=${BEGET_PATH:-public_html}
LOCAL_OUT_DIR=${LOCAL_OUT_DIR:-out}
PRESERVE_FILE=${PRESERVE_FILE:-yandex_b0b5721aa7d481dd.html}
PRESERVE_DIR=${PRESERVE_DIR:-prices}
RSYNC_EXTRA=${RSYNC_EXTRA:-}

if [[ ! -d "$LOCAL_OUT_DIR" ]]; then
  echo "[ERROR] Local output directory '$LOCAL_OUT_DIR' not found. Run 'npm run build' first." >&2
  exit 1
fi

if [[ -z "${PRESERVE_FILE}" || -z "${PRESERVE_DIR}" ]]; then
  echo "[ERROR] PRESERVE_FILE and PRESERVE_DIR must be set." >&2
  exit 1
fi

# Build SSH and RSYNC commands depending on auth method
SSH_OPTS=("-o" "StrictHostKeyChecking=no")
if [[ -n "${BEGET_PORT:-}" ]]; then
  SSH_OPTS+=("-p" "$BEGET_PORT")
fi
if [[ -n "${BEGET_IDENTITY_FILE:-}" ]]; then
  SSH_OPTS+=("-i" "$BEGET_IDENTITY_FILE")
fi
# If using key auth (no BEGET_PASS), force publickey-only to avoid password prompts
if [[ -z "${BEGET_PASS:-}" ]]; then
  SSH_OPTS+=("-o" "PubkeyAuthentication=yes" "-o" "PreferredAuthentications=publickey" "-o" "PasswordAuthentication=no")
fi

# Detect password vs key auth
USE_SSHPASS=0
if [[ -n "${BEGET_PASS:-}" ]]; then
  USE_SSHPASS=1
  if ! command -v sshpass >/dev/null 2>&1; then
    echo "[ERROR] sshpass is required for password auth but not found." >&2
    echo "Install: macOS -> brew install hudochenkov/sshpass/sshpass ; Ubuntu/Debian -> sudo apt-get install -y sshpass" >&2
    exit 1
  fi
fi

SSH_BASE=(ssh "${SSH_OPTS[@]}")
RSYNC_BASE=(rsync -avz --delete)  # --delete removes remote files not present locally (except those excluded)

if [[ $USE_SSHPASS -eq 1 ]]; then
  # Resolve absolute binaries to avoid PATH issues on macOS
  SSHPASS_BIN="$(command -v sshpass || true)"
  SSH_BIN="$(command -v ssh || true)"
  if [[ -z "$SSHPASS_BIN" || -z "$SSH_BIN" ]]; then
    echo "[ERROR] Could not resolve sshpass or ssh binary in PATH." >&2
    exit 1
  fi
  SSH_WRAP=("$SSHPASS_BIN" -p "$BEGET_PASS" "${SSH_BASE[@]}")
  # Create a temporary RSH wrapper to avoid macOS rsync + sshpass issues
  RSH_WRAPPER="tmp_rovodev_rsh_$$.sh"
  # Build wrapper safely with proper quoting and literal "$@"
  printf '#!/bin/sh\n' > "$RSH_WRAPPER"
  # shellcheck disable=SC2059
  printf 'exec %s -p %s %s %s "$@"\n' \
    "$(printf '%q' "$SSHPASS_BIN")" \
    "$(printf '%q' "$BEGET_PASS")" \
    "$(printf '%q' "$SSH_BIN")" \
    "${SSH_OPTS[*]}" >> "$RSH_WRAPPER"
  chmod +x "$RSH_WRAPPER"
  RSYNC_RSH=("-e" "./$RSH_WRAPPER")
  # Ensure cleanup of wrapper
  cleanup() { rm -f "$RSH_WRAPPER"; }
  trap cleanup EXIT
else
  SSH_WRAP=("${SSH_BASE[@]}")
  RSYNC_RSH=("-e" "ssh ${SSH_OPTS[*]}")
fi

REMOTE="${BEGET_USER}@${BEGET_HOST}:${BEGET_PATH}"
REMOTE_SHELL_TARGET="${BEGET_USER}@${BEGET_HOST}"

# Summary
echo "=== Beget Deploy ==="
echo "Host:        $BEGET_HOST"
echo "User:        $BEGET_USER"
echo "Remote path: $BEGET_PATH"
echo "Local dir:   $LOCAL_OUT_DIR"
echo "Preserve:    file '$PRESERVE_FILE', dir '$PRESERVE_DIR/'"
if [[ -n "${BEGET_PASS:-}" ]]; then echo "Auth:        password (sshpass)"; else echo "Auth:        key (ssh-agent)"; fi

# Confirm
CONFIRM=0
if [[ "${1:-}" == "--yes" || "${YES:-}" == "1" ]]; then
  CONFIRM=1
fi

if [[ $CONFIRM -eq 0 ]]; then
  read -r -p "Proceed with deployment to ${BEGET_USER}@${BEGET_HOST}:${BEGET_PATH}? [y/N] " ans
  if [[ ! "$ans" =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
  fi
fi

# Remote cleanup (skip when DRY_RUN=1 or SKIP_CLEAN=1)
if [[ "${DRY_RUN:-0}" == "1" || "${SKIP_CLEAN:-0}" == "1" ]]; then
  if [[ "${DRY_RUN:-0}" == "1" ]]; then echo "[DRY-RUN] Skipping remote cleanup."; fi
  if [[ "${SKIP_CLEAN:-0}" == "1" ]]; then echo "[1/2] Skipping remote cleanup due to SKIP_CLEAN=1."; fi
else
  echo "[1/2] Cleaning remote directory while preserving $PRESERVE_FILE, $PRESERVE_DIR/, .ssh/, .cache/ ..."
  CLEAN_CMD="cd '${BEGET_PATH}' && find . -mindepth 1 -maxdepth 1 \\
    ! -name '.' \\
    ! -name '.ssh' \\
    ! -name '.cache' \\
    ! -name '${PRESERVE_FILE}' \\
    ! -name '${PRESERVE_DIR}' \\
    -exec rm -rf -- {} +"
  # shellcheck disable=SC2029
  set +e
  "${SSH_WRAP[@]}" "${REMOTE_SHELL_TARGET}" "$CLEAN_CMD"
  CLEAN_RC=$?
  set -e
  if [[ $CLEAN_RC -ne 0 ]]; then
    echo "[WARN] Remote cleanup failed (exit code $CLEAN_RC). Continuing with upload."
  fi
fi

# Upload using SFTP batch (simple and robust, default)
echo "[2/2] Upload (sftp) from '$LOCAL_OUT_DIR/' to '${BEGET_USER}@${BEGET_HOST}:${BEGET_PATH}' (excluding '${PRESERVE_DIR}/', '${PRESERVE_FILE}', .ssh/, .cache/, __MACOSX/, .DS_Store, ._*) ..."

# Build SFTP batch file with top-level items (files and dirs), excluding preserved/system ones
BATCH_FILE="tmp_rovodev_sftp_$$.cmd"
{
  echo "lcd $LOCAL_OUT_DIR"
  echo "cd $BEGET_PATH"
  # Queue directories first
  for item in "$LOCAL_OUT_DIR"/* "$LOCAL_OUT_DIR"/.[!.]* "$LOCAL_OUT_DIR"/..?*; do
    name="$(basename "$item")"
    [[ "$name" == "." || "$name" == ".." ]] && continue
    [[ "$name" == "$PRESERVE_DIR" ]] && continue
    [[ "$name" == ".ssh" || "$name" == ".cache" ]] && continue
    [[ "$name" == "__MACOSX" ]] && continue
    [[ "$name" == "$PRESERVE_FILE" ]] && continue
    [[ "$name" == ".DS_Store" ]] && continue
    [[ "$name" == ._* ]] && continue
    if [[ -d "$item" ]]; then
      echo "-mkdir \"$name\""
      echo "put -r \"$name\""
    fi
  done
  # Then files (so that .htaccess, html, manifest.json, etc. upload too)
  for item in "$LOCAL_OUT_DIR"/* "$LOCAL_OUT_DIR"/.[!.]* "$LOCAL_OUT_DIR"/..?*; do
    name="$(basename "$item")"
    [[ "$name" == "." || "$name" == ".." ]] && continue
    [[ "$name" == "$PRESERVE_DIR" ]] && continue
    [[ "$name" == ".ssh" || "$name" == ".cache" ]] && continue
    [[ "$name" == "__MACOSX" ]] && continue
    [[ "$name" == "$PRESERVE_FILE" ]] && continue
    [[ "$name" == ".DS_Store" ]] && continue
    [[ "$name" == ._* ]] && continue
    if [[ -f "$item" ]]; then
      echo "put \"$name\""
    fi
  done
} > "$BATCH_FILE"

if [[ "${DRY_RUN:-0}" == "1" ]]; then
  echo "[DRY-RUN] SFTP batch preview (first 50 lines):"
  sed -n '1,50p' "$BATCH_FILE"
  rm -f "$BATCH_FILE"
else
  # Build sftp command with key/port options
  SFTP_CMD=(sftp)
  if [[ -n "${BEGET_IDENTITY_FILE:-}" ]]; then
    SFTP_CMD+=("-i" "$BEGET_IDENTITY_FILE")
  fi
  if [[ -n "${BEGET_PORT:-}" ]]; then
    SFTP_CMD+=("-P" "$BEGET_PORT")
  fi
  SFTP_CMD+=("-o" "StrictHostKeyChecking=no" "-b" "$BATCH_FILE" "${BEGET_USER}@${BEGET_HOST}")
  "${SFTP_CMD[@]}"
  RC=$?
  rm -f "$BATCH_FILE"
  if [[ $RC -ne 0 ]]; then
    echo "[ERROR] SFTP upload failed with exit code $RC" >&2
    exit $RC
  fi
fi

echo "✅ Deploy complete."
