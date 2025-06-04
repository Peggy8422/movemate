export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const isServer = typeof window === "undefined";

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    // process.env.NEXT_PUBLIC_DEV_BASE_URL || "http://localhost:3000";

  const fetchOptions: RequestInit & { cache?: RequestCache } = {
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  };

  if (isServer) {
    // 僅 server component 加上 cache:no-store
    fetchOptions.cache = "no-store";
  }

  const res = await fetch(`${baseUrl}${path}`, fetchOptions);

  if (!res.ok) {
    throw new Error(`API fetch error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};
