import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay?: number): T {
  const [debuncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debuncedValue;
}
