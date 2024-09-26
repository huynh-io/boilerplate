import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "./api-client";

export type CatalogItemItemData = {
  name: string;
};

export type CatalogItem = {
  itemData: CatalogItemItemData;
  id: string;
};

// TODO: refactor useInfinteQuery logic into shared function to reduce duplication
export function useSearch({ query }: { query?: string }) {
  return useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: async ({ pageParam }): Promise<CatalogItem[]> => {
      const urlWithPage = `/api/v1/search?page=${pageParam}`;
      const urlWithPageAndSearch = query
        ? `${urlWithPage}&query=${query}`
        : urlWithPage;

      const response = await apiClient.get<{ catalogItems: CatalogItem[] }>(
        urlWithPageAndSearch
      );

      return response.data.catalogItems;
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
