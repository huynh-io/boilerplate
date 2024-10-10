import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./api-client";

export type User = {
  id: string;
  email: string;
  accessToken?: string;
  admin?: boolean;
};

export function useCreateUser(options?: NonNullable<unknown>) {
  return useMutation({
    ...options,
    mutationFn: async (id_token: string): Promise<User> => {
      const response = await apiClient.post("/api/v1/users", {
        id_token,
      });

      return response.data;
    },
  });
}

export function useGetUsersMe(options?: NonNullable<unknown>) {
  return useQuery({
    ...options,
    queryKey: ["user"],
    queryFn: async () => {
      const response = await apiClient.get("/api/v1/users/me");

      return response.data;
    },
  });
}
