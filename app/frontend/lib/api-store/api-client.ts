import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import {
  keepPreviousData,
  QueryClient,
  infiniteQueryOptions,
} from "@tanstack/react-query";
import { useAppStore } from "@/lib/app-store";

export const apiQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export const apiClient = applyCaseMiddleware(
  axios.create({
    baseURL: "/",
    validateStatus: (status) => status < 500,
  }),
  { ignoreHeaders: true }
);

apiClient.interceptors.request.use((config) => {
  const accessToken = useAppStore.getState().accessToken ?? "";
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

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
