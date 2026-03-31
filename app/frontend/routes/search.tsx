import { createFileRoute, useNavigate } from "@tanstack/react-router";
import debounce from "debounce";
import { MapPinIcon, Loader2Icon } from "lucide-react";
import SearchForm from "@/components/search-form";
import { useSearch, type CatalogItem } from "@/lib/api-store";
import { Button } from "@/components/ui/button";
import ScrollableList from "@/components/scrollable-list";

type SearchParams = {
  q?: string;
};

export const Route = createFileRoute("/search")({
  component: SearchPage,
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: (search.q as string) || undefined,
  }),
});

function SearchPage() {
  const navigate = useNavigate();
  const { q: query } = Route.useSearch();

  const { error, isError, isFetching, data, fetchNextPage, hasNextPage } = useSearch({
    query: query,
  });

  const onLoadMore = debounce(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, 100);

  const onSearch = (query: string) => {
    navigate({ to: "/search", search: { q: query } });
  };

  if (isError) {
    return <div>{error.message}</div>;
  }

  const catalogItems = (data?.pages.flat() as CatalogItem[]) ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-background border-b w-full max-w-6xl mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-4">What are you craving?</h1>
        <SearchForm initialQuery={query} onSearch={onSearch} />
      </div>

      <div className="w-full max-w-6xl max-h-screen h-screen mx-auto px-4 py-4">
        <ScrollableList>
          <ul className="space-y-4">
            {catalogItems.map((catalogItem: CatalogItem) => (
              <li key={catalogItem.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900">
                <h2 className="text-xl font-semibold mb-2">{catalogItem.itemData.name}</h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="flex items-center">
                    <MapPinIcon className="mr-2 h-4 w-4" />
                    {catalogItem.itemData.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollableList>

        {hasNextPage && (
          <div className="flex justify-center border-t mt-4 p-4">
            {isFetching ? (
              <Loader2Icon className="animate-spin h-6 w-4 text-gray-500" />
            ) : (
              <Button variant="outline" size="sm" onClick={onLoadMore}>
                Load More
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
