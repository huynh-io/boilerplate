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

  const suppliersList = suppliers.map((supplier: Supplier) => <></>);

  return (
    <TabsContent value="suppliers">
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </TabsContent>
  );
}
