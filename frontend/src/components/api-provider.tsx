"use client";

import { apiPersisterOptions, apiQueryClient } from "@/lib/api-store";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

export default function ApiProvider(props: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={apiQueryClient}
      persistOptions={apiPersisterOptions}
    >
      {props.children}
    </PersistQueryClientProvider>
  );
}
