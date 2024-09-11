import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4">
      <div className="w-full max-w-3xl space-y-12 text-center mt-20 sm:mt-32">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          What are you craving?
        </h1>
        <form className="w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="w-full pl-10 pr-4 py-6 text-lg"
              placeholder="Search for anything..."
              type="search"
            />
            <Button
              className="absolute right-1 top-1/2 -translate-y-1/2"
              size="sm"
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
        <p className="text-xs text-muted-foreground">
          Press Enter to search or use the search button
        </p>
      </div>
    </div>
  );
}
