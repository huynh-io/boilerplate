"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface SearchFormProps {
  onSearch?: (search: string) => void;
}

export default function SearchForm(props: SearchFormProps) {
  const internalOnSearch = (formData: FormData) => {
    if (props.onSearch) {
      const query = formData.get("search") as string;

      props.onSearch(query ?? "");
    }
  };

  return (
    <form className="w-full" action={internalOnSearch}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="w-full pl-10 pr-4 py-6 text-lg"
          placeholder="Search for anything..."
          name="search"
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
  );
}
