import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface SearchFormProps {
  initialQuery?: string;
  onSearch?: (search: string) => void;
}

export default function SearchForm({ initialQuery, onSearch }: SearchFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSearch) {
      const formData = new FormData(event.currentTarget);
      const query = formData.get("search") as string;
      onSearch(query ?? "");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="w-full pl-10 pr-4 py-6 text-lg"
          placeholder="Search for anything..."
          name="search"
          type="search"
          defaultValue={initialQuery}
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
