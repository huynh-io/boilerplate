import axios from "axios";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  keepPreviousData,
  QueryClient,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";

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

const apiUrl = process.env.API_URL;
const apiClient = axios.create({
  baseURL: apiUrl,
});

// TODO: consider moving into individual files
export type Supplier = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export function useSuppliers(query?: string) {
  return useInfiniteQuery({
    queryKey: ["suppliers"],
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
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return 0;
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
