"use client";

import AdminTabList from "./admin-tab-list";
import { Tabs } from "@/components/ui/tabs";
import SuppliersTabContent from "./suppliers-tab-content";
import CatalogItemsTabContent from "./catalog-items-tab-content";
import UsersTabContent from "./users-tab-content";
import { useRouter } from "next/navigation";
import { useGetUsersMe } from "@/lib/api-store";
import { useEffect } from "react";
import FullPageSpinner from "@/components/full-page-spinner";

export default function Component() {
  const router = useRouter();
  const { data: currentUser, status } = useGetUsersMe();

  useEffect(() => {
    if (status === "success" && !currentUser?.admin) {
      router.push("/");
    }
  }, [currentUser, status, router]);

  if (status === "pending") {
    return <FullPageSpinner />;
  }

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
