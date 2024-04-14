import { useState, useEffect } from "react";

const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [localState, setLocalState] = useState<T>(() => {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(localState));
  }, [localState, key]);

  return [localState, setLocalState] as const;
};

export default useLocalStorage;
