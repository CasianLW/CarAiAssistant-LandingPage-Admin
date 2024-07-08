import { useState, useCallback } from "react";

interface RequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: HeadersInit;
}

interface ApiHelperHook {
  isLoading: boolean;
  error: string | null;
  sendRequest: (config: RequestConfig) => Promise<any>;
}

export function useApiHelper(): ApiHelperHook {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(
    async ({
      url,
      method = "GET",
      body = null,
      headers = {},
    }: RequestConfig): Promise<any> => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found.");
        setIsLoading(false);
        return Promise.reject(new Error("Authentication token not found."));
      }

      const authHeaders: HeadersInit = {
        "Content-Type": "application/json",
        ...headers,
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch(url, {
          method,
          headers: authHeaders,
          body: body ? JSON.stringify(body) : null,
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong!");
        }
        setIsLoading(false);
        return data;
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  return { isLoading, error, sendRequest };
}
