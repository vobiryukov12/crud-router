import { useEffect, useState } from "react";

export default function useJsonFetch<T>(url: string, opts = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchData() {
    try {
      setError('');
      setLoading(true); 
      const response = await fetch(url, opts);

      if (!response.ok) {
        setLoading(false);
        setError(`Ошибка! статус: ${response.status}`);
        return;
      }

      const responseData = await response.json();

      setData(responseData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      const error = new Error(" Ого, ошибка! o_O");
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return [ data, loading, error, setError ] as const;
}
