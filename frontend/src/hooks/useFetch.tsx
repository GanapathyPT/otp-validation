import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch<T>(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchData = async (
    method: RequestInit["method"],
    token: string | null = null,
    data?: any
  ): Promise<null | T> => {
    setError(undefined);
    setLoading(true);
    let response = null;
    try {
      response = await axios.request({
        url,
        method,
        data,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
    } catch (error) {
      const errMessage =
        (error as any)?.response?.data?.message || String(error);
      setError(errMessage);
    } finally {
      setLoading(false);
    }

    return response?.data;
  };

  return {
    loading,
    error,
    fetchData,
  };
}
