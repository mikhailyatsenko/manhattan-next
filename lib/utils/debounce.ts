/**
 * Debounce function - delays function execution until after specified time has elapsed
 * since the last time it was invoked
 * @param func - Function to debounce
 * @param delay - Time to wait in milliseconds before calling the function
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
