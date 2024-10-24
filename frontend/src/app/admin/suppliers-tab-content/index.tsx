"use client";

import ScrollableList from "@/components/scrollable-list";
import SearchForm from "@/components/search-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Supplier, useGetAdminSuppliers } from "@/lib/api-store";
import debounce from "debounce";
import { Loader2Icon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// Done:
// 1. Add address to supplier model
// TODOs:
// 2. render address, email, and phone in supplier list
// 3. Make admin/suppliers API protected
// 4. Add create, update, destroy API operations for suppliers
// 5. Create UI for creating, updating, and destroying suppliers
// 6. Update tabs to use own set of query params
export default function SuppliersTabContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? undefined;

  const { error, isError, isFetching, data, fetchNextPage, hasNextPage } = useGetAdminSuppliers({
    query: query,
  });

  const onLoadMore = debounce(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, 100);

  const onSearch = (query: string) => {
    router.push(`/admin?q=${query}`);
  };

  if (isError) {
    return <div>{error.message}</div>;
  }

  const suppliers = (data?.pages.flat() as Supplier[]) ?? [];

  return (
    <TabsContent value="suppliers">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Suppliers</CardTitle>
          <SearchForm initialQuery={query} onSearch={onSearch} />
        </CardHeader>

        <CardContent className="mt-4">
          <ScrollableList bottomOffset="28rem">
            <ul className="space-y-4">
              {suppliers.map((supplier: Supplier) => (
                <li key={supplier.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900">
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
              ))}
            </ul>
          </ScrollableList>

          {hasNextPage && (
            <div className="flex justify-center border-t mt-4 pt-6">
              {isFetching ? (
                <Loader2Icon className="animate-spin h-6 w-4 text-gray-500" />
              ) : (
                <Button variant="outline" size="sm" onClick={onLoadMore}>
                  Load More
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
