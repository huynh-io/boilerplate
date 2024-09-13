import axios from "axios";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const apiQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 3 retries before stopping
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 60 * 2, // 1 hour
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
type Supplier = {
  id: string;
  name: string;
};

export function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async (): Promise<Supplier[]> => {
      const response = await apiClient.get<Supplier[]>("/api/v1/suppliers");

      return response.data;
    },
  });
}

export function useUsersVerifyIdToken() {
  return useMutation({
    mutationFn: async (id_token: string): Promise<any> => {
      const response = await apiClient.post("/api/v1/users/verify_id_token", {
        id_token,
      });

      return response.data;
    },
  });
}
