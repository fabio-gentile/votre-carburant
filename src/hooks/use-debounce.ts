import { useEffect, useState } from 'react';

/**
 * Custom hook for debouncing a value.
 * @param value - The value to be debounced.
 * @param delay - The delay in milliseconds. Defaults to 250 milliseconds.
 * @returns The debounced value.
 * @example
 * const debounceQuery = useDebounce(query, 500);
 */
export function useDebounce(value: string, delay = 250) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
}
