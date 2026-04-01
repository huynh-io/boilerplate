import { apiQueryClient } from "@/lib/api-store";
import { QueryClientProvider } from "@tanstack/react-query";

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={apiQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
