import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enable static export for regular hosting (Beget)
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

export default nextConfig;
