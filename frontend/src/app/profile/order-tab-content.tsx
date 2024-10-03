"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export default function OrderTabContent() {
  return (
    <TabsContent value="orders">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>View your recent orders here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You have no recent orders.</p>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
