import {
  keepPreviousData,
  QueryClient,
  infiniteQueryOptions,
} from "@tanstack/react-query";
import { useAppStore, resetAppStore } from "@/lib/app-store";
import { camelizeKeys, decamelizeKeys } from "./case-converter";

export const apiQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export interface ApiResponse<T> {
  status: number;
  data: T;
  headers: Headers;
}

export class HttpError extends Error {
  status: number;
  data: unknown;
  constructor(status: number, data: unknown) {
    super(`HTTP Error ${status}`);
    this.status = status;
    this.data = data;
  }
}

const AUTH_ENDPOINTS = ["/api/v1/sign_in", "/api/v1/sign_up"];

async function request<T>(
  method: string,
  url: string,
  body?: unknown,
): Promise<ApiResponse<T>> {
  const accessToken = useAppStore.getState().accessToken ?? "";
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
  };

  const options: RequestInit = { method, headers };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(decamelizeKeys(body));
  }

  const response = await fetch(url, options);

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    // Empty body (e.g. 204 No Content)
  }
  data = camelizeKeys(data);

  if (response.status >= 500) {
    throw new HttpError(response.status, data);
  }

  const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) =>
    url.includes(endpoint),
  );
  if (response.status === 401 && !isAuthEndpoint) {
    resetAppStore();
    window.location.href = "/sign-in";
  }

  return {
    status: response.status,
    data: data as T,
    headers: response.headers,
  };
}

export const apiClient = {
  get: <T>(url: string) => request<T>("GET", url),
  post: <T>(url: string, data?: unknown) => request<T>("POST", url, data),
  delete: <T>(url: string) => request<T>("DELETE", url),
  patch: <T>(url: string, data?: unknown) => request<T>("PATCH", url, data),
};

export interface InfiniteQueryFnParams {
  pageParam: number;
}
export interface InfiniteQueryFn {
  <T>({ pageParam }: InfiniteQueryFnParams): Promise<T[]>;
}
export interface GenerateInfiniteQueryOptionsParams {
  queryKey: (string | undefined)[];
  queryFn: InfiniteQueryFn;
}

export function generateInfiniteQueryOptions({
  queryKey,
  queryFn,
}: GenerateInfiniteQueryOptionsParams) {
  return infiniteQueryOptions({
    queryKey: queryKey,
    queryFn: queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage: unknown[], _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    placeholderData: keepPreviousData,
  });
}
