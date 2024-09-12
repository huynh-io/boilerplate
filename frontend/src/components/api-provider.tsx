import { apiPersisterOptions, apiQueryClient } from "@/lib/api-store";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

export default function ApiProvider(children: React.ReactNode) {
  return (
    <PersistQueryClientProvider
      client={apiQueryClient}
      persistOptions={apiPersisterOptions}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
