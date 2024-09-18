"use client";

import SearchForm from "@/components/search-form";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const onSearch = (query: string) => {
    router.push(`/search?q=${query}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4">
      <div className="w-full max-w-3xl space-y-12 text-center mt-20 sm:mt-32">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          What are you craving?
        </h1>

        <SearchForm onSearch={onSearch} />

        <p className="text-xs text-muted-foreground">
          Press Enter to search or use the search button
        </p>
      </div>
    </div>
  );
}
