"use client";

import { Tabs } from "@/components/ui/tabs";
import ProfileTabList from "./profile-tab-list";
import ProfileTabContent from "./profile-tab-content";
import OrderTabContent from "./order-tab-content";

export default function Profile() {
  return (
    <div className="flex items-start justify-center min-h-screen bg-background p-4">
      <Tabs defaultValue="profile" className="w-full max-w-3xl">
        <ProfileTabList />

        <ProfileTabContent />
        <OrderTabContent />
      </Tabs>
    </div>
  );
}
