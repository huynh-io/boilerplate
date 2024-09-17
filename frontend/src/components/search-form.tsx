"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface SearchFormProps {
  onSearch?: (event: React.FormEvent) => void;
}

export default function SearchForm(props: SearchFormProps) {
  const internalOnSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (props.onSearch) {
      props.onSearch(event);
    }
  };

  return (
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
          onClick={internalOnSearch}
        >
          Search
        </Button>
      </div>
    </form>
  );
}
