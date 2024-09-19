"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: log error to a service.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || "Something went wrong. Please try again."}
        </AlertDescription>
      </Alert>
      <Button onClick={reset} className="mt-4">
        Try again
      </Button>
    </div>
  );
}
