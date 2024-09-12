import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, useQuery } from "@tanstack/react-query";

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

// TODO: consider moving into individual files
type Supplier = {
  id: string;
  name: string;
};

export function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async (): Promise<Array<Supplier>> => {
      const response = await fetch(`${apiUrl}/api/v1/suppliers`);
      return await response.json();
    },
  });
}
