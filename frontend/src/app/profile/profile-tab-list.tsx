"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfileTabList() {
  return (
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="profile">Profile</TabsTrigger>
      <TabsTrigger value="orders">Orders</TabsTrigger>
    </TabsList>
  );
}
