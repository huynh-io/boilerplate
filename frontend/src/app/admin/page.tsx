"use client";

import AdminTabList from "./admin-tab-list";
import { Tabs } from "@/components/ui/tabs";
import SuppliersTabContent from "./suppliers-tab-content";
import CatalogItemsTabContent from "./catalog-items-tab-content";
import UsersTabContent from "./users-tab-content";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4">
      <Tabs defaultValue="suppliers" className="w-full max-w-3xl">
        <AdminTabList />

        <SuppliersTabContent />
        <CatalogItemsTabContent />
        <UsersTabContent />
      </Tabs>
    </div>
  );
}
