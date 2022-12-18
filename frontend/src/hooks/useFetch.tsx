import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch<T>(
  url: string,
  method?: RequestInit["method"],
  returnFn = false
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();

  const fetchData = async (data?: any) => {
    setError(undefined);
    setLoading(true);
    try {
      const response = await axios.request({
        url,
        method,
        data,
      });
      setData(response.data);
    } catch (error) {
      const errMessage =
        (error as any)?.response?.data?.message || String(error);
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!returnFn) fetchData();
  }, [url, method, returnFn]);

  return {
    loading,
    data,
    error,
    fetchData,
  };
}
