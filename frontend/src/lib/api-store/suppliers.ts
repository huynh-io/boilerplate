import { useInfiniteQuery } from "@tanstack/react-query";
import {
  apiClient,
  generateInfiniteQueryOptions,
  InfiniteQueryFnParams,
} from "./api-client";

export type Supplier = {
  email: string;
  name: string;
  phone: string;
  id: string;
};

export function useSuppliers({ query }: { query?: string }) {
  return useInfiniteQuery(
    generateInfiniteQueryOptions({
      queryKey: ["suppliers", query],
      queryFn: async <Supplier>({
        pageParam,
      }: InfiniteQueryFnParams): Promise<Supplier[]> => {
        const urlWithPage = `/api/v1/suppliers?page=${pageParam}`;
        const urlWithPageAndSearch = query
          ? `${urlWithPage}&query=${query}`
          : urlWithPage;

        const response = await apiClient.get<{ suppliers: Supplier[] }>(
          urlWithPageAndSearch
        );

        return response.data.suppliers;
      },
    })
  );
}
