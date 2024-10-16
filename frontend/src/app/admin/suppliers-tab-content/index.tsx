"use client";

import SearchForm from "@/components/search-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Supplier, useGetAdminSuppliers } from "@/lib/api-store";
import debounce from "debounce";
import { Loader2Icon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

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
    router.push(`/search?q=${query}`);
  };

  if (isError) {
    return <div>{error.message}</div>;
  }

  const suppliers = (data?.pages.flat() as Supplier[]) ?? [];

  const suppliersList = suppliers.map((supplier: Supplier) => (
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
  ));

  return (
    <TabsContent value="suppliers">
      <Card>
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
          <div className="w-full max-w-6xl mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold mb-4">What are you craving?</h1>
            <SearchForm initialQuery={query} onSearch={onSearch} />
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </TabsContent>
  );
}
