import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "./api-client";

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
