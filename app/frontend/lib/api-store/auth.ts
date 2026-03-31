import { useMutation } from "@tanstack/react-query";
import { apiClient, apiQueryClient } from "./api-client";
import { useAppStore, resetAppStore } from "@/lib/app-store";

export function useSignIn() {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await apiClient.post("/api/v1/sign_in", {
        user: { email, password },
      });

      if (response.status === 401) {
        throw new Error("Invalid email or password");
      }

      const jwt = response.headers["authorization"]?.replace("Bearer ", "");
      if (jwt) {
        useAppStore.setState({ authenticated: true, accessToken: jwt });
      }

      return response.data;
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
      passwordConfirmation,
    }: {
      email: string;
      password: string;
      passwordConfirmation: string;
    }) => {
      const response = await apiClient.post("/api/v1/sign_up", {
        user: { email, password, password_confirmation: passwordConfirmation },
      });

      if (response.status === 422) {
        throw new Error(response.data.errors?.join(", ") || "Sign up failed");
      }

      const jwt = response.headers["authorization"]?.replace("Bearer ", "");
      if (jwt) {
        useAppStore.setState({ authenticated: true, accessToken: jwt });
      }

      return response.data;
    },
  });
}

export function useSignOut() {
  return useMutation({
    mutationFn: async () => {
      await apiClient.delete("/api/v1/sign_out");
      resetAppStore();
      apiQueryClient.clear();
    },
  });
}
