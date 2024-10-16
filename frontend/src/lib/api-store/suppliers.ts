import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient, generateInfiniteQueryOptions, InfiniteQueryFnParams } from "./api-client";

export type Supplier = {
  email: string;
  name: string;
  phone: string;
  id: string;
};

export function useGetAdminSuppliers(options?: { query?: string }) {
  return useInfiniteQuery(
    generateInfiniteQueryOptions({
      ...options,
      queryKey: ["suppliers", options?.query],
      queryFn: async <Supplier>({ pageParam }: InfiniteQueryFnParams): Promise<Supplier[]> => {
        const urlWithPage = `/api/v1/admin/suppliers?page=${pageParam}`;
        const urlWithPageAndSearch = options?.query ? `${urlWithPage}&query=${options.query}` : urlWithPage;

        const response = await apiClient.get<{ suppliers: Supplier[] }>(urlWithPageAndSearch);

        return response.data.suppliers;
      },
    })
  );
}
