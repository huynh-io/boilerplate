"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminTabList() {
  return (
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
      <TabsTrigger value="catalog-items">Catalog Items</TabsTrigger>
      <TabsTrigger value="users">Users</TabsTrigger>
    </TabsList>
  );
}
