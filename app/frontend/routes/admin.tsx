import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScrollableList from "@/components/scrollable-list";
import SearchForm from "@/components/search-form";
import { useGetUsersMe, useGetAdminSuppliers, useGetAdminUsers, type Supplier, type User } from "@/lib/api-store";
import { useAppStore, type AppState } from "@/lib/app-store";
import FullPageSpinner from "@/components/full-page-spinner";
import debounce from "debounce";
import { Loader2Icon, MailIcon, MapPinIcon, PhoneIcon, ShieldCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

type AdminSearchParams = {
  q?: string;
};

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  validateSearch: (search: Record<string, unknown>): AdminSearchParams => ({
    q: (search.q as string) || undefined,
  }),
});

function AdminPage() {
  const navigate = useNavigate();
  const authenticated = useAppStore((state: AppState) => state.authenticated);
  const { data: currentUser, status } = useGetUsersMe();

  useEffect(() => {
    if (!authenticated) {
      navigate({ to: "/sign-in" });
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    if (status === "success" && !currentUser?.admin) {
      navigate({ to: "/" });
    }
  }, [currentUser, status, navigate]);

  if (status === "pending") {
    return <FullPageSpinner />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4">
      <Tabs defaultValue="suppliers" className="w-full max-w-6xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <SuppliersTab />

        <UsersTab />
      </Tabs>
    </div>
  );
}

function UsersTab() {
  const navigate = useNavigate();
  const { q: query } = Route.useSearch();
  const [searchQuery, setSearchQuery] = useState(query);

  const { error, isError, isFetching, data, fetchNextPage, hasNextPage } = useGetAdminUsers({
    query: searchQuery,
  });

  const onLoadMore = debounce(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, 100);

  const onSearch = (query: string) => {
    setSearchQuery(query);
    navigate({ to: "/admin", search: { q: query } });
  };

  if (isError) {
    return <div>{error.message}</div>;
  }

  const users = (data?.pages.flat() as User[]) ?? [];

  return (
    <TabsContent value="users">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Users</CardTitle>
          <SearchForm initialQuery={query} onSearch={onSearch} />
        </CardHeader>
        <CardContent className="mt-4">
          <ScrollableList bottomOffset="28rem">
            <ul className="space-y-4">
              {users.map((user: User) => (
                <li key={user.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold">{user.email}</h2>
                    {user.admin && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <ShieldCheckIcon className="h-3 w-3" />
                        Admin
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center">
                      <MailIcon className="mr-2 h-4 w-4" />
                      {user.email}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollableList>
          {hasNextPage && (
            <div className="flex justify-center border-t mt-4 pt-6">
              {isFetching ? (
                <Loader2Icon className="animate-spin h-6 w-4 text-gray-500" />
              ) : (
                <Button variant="outline" size="sm" onClick={onLoadMore}>
                  Load More
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}

function SuppliersTab() {
  const navigate = useNavigate();
  const { q: query } = Route.useSearch();
  const [searchQuery, setSearchQuery] = useState(query);

  const { error, isError, isFetching, data, fetchNextPage, hasNextPage } = useGetAdminSuppliers({
    query: searchQuery,
  });

  const onLoadMore = debounce(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, 100);

  const onSearch = (query: string) => {
    setSearchQuery(query);
    navigate({ to: "/admin", search: { q: query } });
  };

  if (isError) {
    return <div>{error.message}</div>;
  }

  const suppliers = (data?.pages.flat() as Supplier[]) ?? [];

  return (
    <TabsContent value="suppliers">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Suppliers</CardTitle>
          <SearchForm initialQuery={query} onSearch={onSearch} />
        </CardHeader>
        <CardContent className="mt-4">
          <ScrollableList bottomOffset="28rem">
            <ul className="space-y-4">
              {suppliers.map((supplier: Supplier) => (
                <li key={supplier.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900">
                  <h2 className="text-xl font-semibold mb-2">{supplier.name}</h2>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      {supplier.address.addressOne}, {supplier.address.city},{" "}
                      {supplier.address.state} {supplier.address.zipCode}
                    </p>
                    <p className="flex items-center">
                      <PhoneIcon className="mr-2 h-4 w-4" />
                      {supplier.phone}
                    </p>
                    <p className="flex items-center">
                      <MailIcon className="mr-2 h-4 w-4" />
                      {supplier.email}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollableList>
          {hasNextPage && (
            <div className="flex justify-center border-t mt-4 pt-6">
              {isFetching ? (
                <Loader2Icon className="animate-spin h-6 w-4 text-gray-500" />
              ) : (
                <Button variant="outline" size="sm" onClick={onLoadMore}>
                  Load More
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
