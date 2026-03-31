import { useInfiniteQuery } from "@tanstack/react-query";
import {
  apiClient,
  generateInfiniteQueryOptions,
  InfiniteQueryFnParams,
} from "./api-client";

export type CatalogItemItemData = {
  name: string;
};

export type CatalogItem = {
  itemData: CatalogItemItemData;
  id: string;
};

export function useSearch(options?: { query?: string }) {
  return useInfiniteQuery(
    generateInfiniteQueryOptions({
      ...options,
      queryKey: ["search", options?.query],
      queryFn: async <CatalogItem>({
        pageParam,
      }: InfiniteQueryFnParams): Promise<CatalogItem[]> => {
        const urlWithPage = `/api/v1/search?page=${pageParam}`;
        const urlWithPageAndSearch = options?.query
          ? `${urlWithPage}&query=${options.query}`
          : urlWithPage;

        const response = await apiClient.get<{ catalogItems: CatalogItem[] }>(
          urlWithPageAndSearch
        );

        return response.data.catalogItems;
      },
    })
  );
}
