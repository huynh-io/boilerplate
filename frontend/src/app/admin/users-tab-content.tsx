"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export default function UsersTabContent() {
  return (
    <TabsContent value="users">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>fetch them there</CardContent>
      </Card>
    </TabsContent>
  );
}
