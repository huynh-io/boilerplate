import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  keepPreviousData,
  QueryClient,
  infiniteQueryOptions,
} from "@tanstack/react-query";
import { useAppStore } from "@/lib/app-store";

export const apiQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 3 retries before stopping
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export const apiPersister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

export const apiPersisterOptions = {
  persister: apiPersister,
};

export const apiUrl = process.env.API_URL;
export const apiClient = applyCaseMiddleware(
  axios.create({
    baseURL: apiUrl,
  }),
  { ignoreHeaders: true }
);

apiClient.interceptors.request.use((config) => {
  const accessToken = useAppStore.getState().currentUser?.accessToken ?? "";
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

// TODO: Figure out how to propagte the type of the data so we don't have to cast it
//  to the expected type in the components
export function generateInfiniteQueryOptions({
  queryKey,
  queryFn,
}: GenerateInfiniteQueryOptionsParams) {
  return infiniteQueryOptions({
    queryKey: queryKey,
    queryFn: queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length == 0) {
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
