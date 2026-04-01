import { useMutation } from "@tanstack/react-query";
import { apiClient, apiQueryClient } from "./api-client";
import { useAppStore, resetAppStore } from "@/lib/app-store";

const NETWORK_ERROR_MESSAGE =
  "Unable to reach the server. Please check your connection and try again.";

function isNetworkError(error: unknown): boolean {
  return error instanceof TypeError;
}

export function useSignIn() {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      let response;
      try {
        response = await apiClient.post("/api/v1/sign_in", {
          user: { email, password },
        });
      } catch (error) {
        if (isNetworkError(error)) {
          throw new Error(NETWORK_ERROR_MESSAGE);
        }
        throw error;
      }

      if (response.status === 401) {
        throw new Error("Invalid email or password");
      }

      const jwt = response.headers.get("authorization")?.replace("Bearer ", "");
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
      let response;
      try {
        response = await apiClient.post<{ errors?: string[] }>("/api/v1/sign_up", {
          user: { email, password, passwordConfirmation },
        });
      } catch (error) {
        if (isNetworkError(error)) {
          throw new Error(NETWORK_ERROR_MESSAGE);
        }
        throw error;
      }

      if (response.status === 422) {
        throw new Error(response.data.errors?.join(", ") || "Sign up failed");
      }

      const jwt = response.headers.get("authorization")?.replace("Bearer ", "");
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
