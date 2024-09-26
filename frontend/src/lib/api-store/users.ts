import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./api-client";

export type User = {
  accessToken: string;
  email: string;
  id: string;
};

export function useUsersCreate() {
  return useMutation({
    mutationFn: async (id_token: string): Promise<User> => {
      const response = await apiClient.post("/api/v1/users", {
        id_token,
      });

      return response.data;
    },
  });
}
