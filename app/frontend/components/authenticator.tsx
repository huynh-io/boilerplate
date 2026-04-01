import { useEffect, useState } from "react";
import { useAppStore, resetAppStore } from "@/lib/app-store";
import FullPageSpinner from "./full-page-spinner";
import { apiClient } from "@/lib/api-store";

export default function Authenticator({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checking, setChecking] = useState(true);
  const accessToken = useAppStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
      setChecking(false);
      return;
    }

    apiClient
      .get("/api/v1/users/me")
      .then((response) => {
        if (response.status === 200) {
          useAppStore.setState({ authenticated: true });
        } else {
          resetAppStore();
        }
      })
      .catch(() => {
        resetAppStore();
      })
      .finally(() => {
        setChecking(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (checking) {
    return <FullPageSpinner />;
  }

  return children;
}
