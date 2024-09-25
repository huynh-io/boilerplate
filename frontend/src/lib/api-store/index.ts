import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  keepPreviousData,
  QueryClient,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { useAppStore } from "../app-store";

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

// TODO: move to a separate file
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

// TODO: consider moving into individual files
export type Supplier = {
  email: string;
  name: string;
  phone: string;
  id: string;
};

export function useSuppliers({ query }: { query?: string }) {
  return useInfiniteQuery({
    queryKey: ["suppliers", query],
    queryFn: async ({ pageParam }): Promise<Supplier[]> => {
      const urlWithPage = `/api/v1/suppliers?page=${pageParam}`;
      const urlWithPageAndSearch = query
        ? `${urlWithPage}&query=${query}`
        : urlWithPage;

      const response = await apiClient.get<{ suppliers: Supplier[] }>(
        urlWithPageAndSearch
      );

      return response.data.suppliers;
    },
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

export type User = {
  accessToken: string;
  email: string;
  id: string;
};

export function useUsersCreate() {
  return useMutation({
    mutationFn: async (id_token: string): Promise<User> => {
      const response = await apiClient.post("/api/v1/users", {
        id_token,
      });

      return response.data;
    },
  });
}
