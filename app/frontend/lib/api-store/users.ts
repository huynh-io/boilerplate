import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./api-client";

export type User = {
  id: string;
  email: string;
  admin?: boolean;
};

export function useGetUsersMe(options?: { enabled?: boolean }) {
  return useQuery({
    ...options,
    queryKey: ["user"],
    queryFn: async () => {
      const response = await apiClient.get<User>("/api/v1/users/me");
      return response.data;
    },
  });
}
