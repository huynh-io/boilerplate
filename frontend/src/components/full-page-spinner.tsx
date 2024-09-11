import { Loader2 } from "lucide-react";

export default function Component() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm dark:bg-background/80">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-xl font-semibold text-primary dark:text-primary-foreground">
          Loading...
        </h2>
      </div>
    </div>
  );
}
