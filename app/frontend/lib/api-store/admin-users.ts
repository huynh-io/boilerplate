import { useInfiniteQuery } from "@tanstack/react-query";
import {
  apiClient,
  generateInfiniteQueryOptions,
  InfiniteQueryFnParams,
} from "./api-client";

export function useGetAdminUsers(options?: { query?: string }) {
  return useInfiniteQuery(
    generateInfiniteQueryOptions({
      ...options,
      queryKey: ["admin-users", options?.query],
      queryFn: async <User>({
        pageParam,
      }: InfiniteQueryFnParams): Promise<User[]> => {
        const urlWithPage = `/api/v1/admin/users?page=${pageParam}`;
        const urlWithPageAndSearch = options?.query
          ? `${urlWithPage}&query=${options.query}`
          : urlWithPage;

        const response = await apiClient.get<{ users: User[] }>(
          urlWithPageAndSearch,
        );

        return response.data.users;
      },
    }),
  );
}
