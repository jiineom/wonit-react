import { useState, useEffect } from "react";

export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const result = await fetcher();
        if (alive) {
          setData(result);
          setError(null);
          setLoading(false);
        }
      } catch (e) {
        if (alive) {
          setError(e.message);
          setData(null);
          setLoading(false);
        }
      }
    }
    load();

    return () => { alive = false; };
  }, [reloadKey, ...deps]);

  const reload = () => setReloadKey((k) => k + 1);
  return { data, loading, error, reload };
}