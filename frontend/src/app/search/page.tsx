"use client";

import debounce from "debounce";
import { MapPinIcon, PhoneIcon, MailIcon, Loader2Icon } from "lucide-react";
import SearchForm from "@/components/search-form";
import { useSuppliers, Supplier } from "@/lib/api-store";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SupplierSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? undefined;

  const { error, isError, isFetching, data, fetchNextPage, hasNextPage } =
    useSuppliers({
      query: query,
    });

  const onLoadMore = debounce(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, 100);

  const onSearch = (query: string) => {
    router.push(`/search?q=${query}`);
  };

  if (isError) {
    return <div>{error.message}</div>;
  }

  const suppliers = data?.pages.flat() ?? [];

  const suppliersList = suppliers.map((supplier: Supplier) => (
    <li key={supplier.id} className="border rounded-lg p-4 hover:bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">{supplier.name}</h2>
      <div className="text-sm text-gray-600 space-y-1">
        <p className="flex items-center">
          <MapPinIcon className="mr-2 h-4 w-4" />
          {supplier.name}
        </p>
        <p className="flex items-center">
          <PhoneIcon className="mr-2 h-4 w-4" />
          {supplier.phone}
        </p>
        <p className="flex items-center">
          <MailIcon className="mr-2 h-4 w-4" />
          {supplier.email}
        </p>
      </div>
    </li>
  ));

  return (
    <div className="min-h-screen flex flex-col pt-32">
      <header className="bg-background border-b shadow-md fixed top-14 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold mb-4">What are you craving?</h1>
          <SearchForm initialQuery={query} onSearch={onSearch} />
        </div>
      </header>

      <div className="flex-grow container mx-auto px-4 py-8">
        <ul className="space-y-4">{suppliersList}</ul>

        {hasNextPage && (
          <div className="flex justify-center mt-4">
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
