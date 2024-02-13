import { DependencyList, useCallback, useRef } from "react";

export function useDebounceCallback<T extends (...args: any[]) => any>(
  /**
   * The callback to be debounced.
   * This callback will be called after `delay` milliseconds since the last time it was called.
   * If it's called again before `delay` milliseconds, the timer will be reset.
   * The callback will be called with the latest arguments.
   * The return value of the callback will be ignored.
   */
  callback: T,

  /**
   * The number of milliseconds to wait before calling the callback.
   */
  delay: number,

  /**
   * Dependencies that will trigger the callback to be re-created if changed.
   * This is useful when you want to change the delay based on some prop or state.
   */
  deps: DependencyList = [],
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay, ...deps],
  );
}
