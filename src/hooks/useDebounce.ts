import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const safeDelay = Math.max(0, delay);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, safeDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
