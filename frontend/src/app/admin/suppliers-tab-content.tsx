"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export default function SuppliersTabContent() {
  return (
    <TabsContent value="suppliers">
      <Card>
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
        </CardHeader>
        <CardContent>fetch them there</CardContent>
      </Card>
    </TabsContent>
  );
}
