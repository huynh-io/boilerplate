import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/lib/app-store";

export const apiQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 3 retries before stopping
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export const apiPersister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

export const apiPersisterOptions = {
  persister: apiPersister,
};

export const apiUrl = process.env.API_URL;
export const apiClient = applyCaseMiddleware(
  axios.create({
    baseURL: apiUrl,
  }),
  { ignoreHeaders: true }
);

apiClient.interceptors.request.use((config) => {
  const accessToken = useAppStore.getState().currentUser?.accessToken ?? "";
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});
