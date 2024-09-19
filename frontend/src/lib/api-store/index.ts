import axios, { AxiosRequestConfig } from "axios";
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
export const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use((config) => {
  // TODO: consider switching to an access token that our API provides after it verifies the ID token
  // This is a total hack to interpret the ID token as an API key as well.
  //
  // https://auth0.com/blog/id-token-access-token-what-is-the-difference/
  const idToken = useAppStore.getState().idToken ?? "";
  config.headers.Authorization = `Bearer ${idToken}`;

  return config;
});

// TODO: consider moving into individual files
export type Supplier = {
  id: string;
  name: string;
  email: string;
  phone: string;
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

export function useUsersVerifyIdToken() {
  return useMutation({
    // Temporarily disable until we can work on the user model
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (id_token: string): Promise<any> => {
      const response = await apiClient.post("/api/v1/users/verify_id_token", {
        id_token,
      });

      return response.data;
    },
  });
}
