import { useCallback, useEffect, useState } from "react";

/**
 * State backed by localStorage. Every read and write is guarded: private mode,
 * blocked storage and corrupt JSON all fall back to the initial value instead
 * of throwing.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initialValue : JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — keep working in memory */
    }
  }, [key, value]);

  // Keep other tabs in sync.
  useEffect(() => {
    function onStorage(event) {
      if (event.key !== key) return;
      try {
        setValue(event.newValue === null ? initialValue : JSON.parse(event.newValue));
      } catch {
        /* ignore malformed payloads from other tabs */
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, setValue, reset];
}
