"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export default function CatalogItemsTabContent() {
  return (
    <TabsContent value="catalog-items">
      <Card>
        <CardHeader>
          <CardTitle>Catalog Items</CardTitle>
        </CardHeader>
        <CardContent>fetch them there</CardContent>
      </Card>
    </TabsContent>
  );
}
