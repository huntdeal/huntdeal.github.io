import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Runs an async service call and exposes {data, loading, error, reload}.
 * Keeps every page's loading/error handling identical and discards stale
 * results when dependencies change.
 *
 * Loading is *derived*, not stored: a result carries the key it was fetched
 * for, so while that key differs from the current one the call is in flight.
 * That avoids a setState-in-effect cascade on every dependency change.
 *
 * @param {Function} asyncFn   Called with no arguments; should return a promise.
 * @param {Array} deps         Re-run when these change. Values must stringify
 *                             stably (strings, numbers, booleans).
 * @param {object} [options]
 * @param {*} [options.initialData]
 * @param {boolean} [options.enabled=true]
 */
export function useAsync(asyncFn, deps = [], options = {}) {
  const { initialData = null, enabled = true } = options;

  const [nonce, setNonce] = useState(0);
  const key = `${deps.map((value) => String(value)).join("|")}#${nonce}`;

  const [result, setResult] = useState({
    key: null,
    data: initialData,
    error: null,
  });

  // Keep the latest callback without reading a ref during render.
  const fnRef = useRef(asyncFn);
  useEffect(() => {
    fnRef.current = asyncFn;
  });

  useEffect(() => {
    if (!enabled) return undefined;

    let active = true;
    Promise.resolve()
      .then(() => fnRef.current())
      .then((data) => {
        if (active) setResult({ key, data, error: null });
      })
      .catch((error) => {
        if (active) setResult({ key, data: null, error });
      });

    return () => {
      active = false;
    };
  }, [key, enabled]);

  const reload = useCallback(() => setNonce((value) => value + 1), []);

  const setData = useCallback(
    (data) => setResult((current) => ({ ...current, data })),
    [],
  );

  return {
    data: result.data,
    error: result.key === key ? result.error : null,
    loading: enabled && result.key !== key,
    reload,
    setData,
  };
}
