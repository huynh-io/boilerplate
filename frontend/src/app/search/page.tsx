"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { MapPinIcon, PhoneIcon, MailIcon, Loader2Icon } from "lucide-react";
import SearchForm from "@/components/search-form";

// const suppliers = useSuppliers();

// if (suppliers.isPending) {
//   return <FullPageSpinner />;
// }

// if (suppliers.isError) {
//   return <div>{suppliers.error.message}</div>;
// }
// Mock function to simulate fetching suppliers from an API
const fetchSuppliers = (page: number, limit: number) => {
  return new Promise<
    Array<{
      id: number;
      name: string;
      location: string;
      phone: string;
      email: string;
    }>
  >((resolve) => {
    setTimeout(() => {
      const newSuppliers = Array.from({ length: limit }, (_, i) => ({
        id: page * limit + i + 1,
        name: `Supplier ${page * limit + i + 1}`,
        location: `City ${page * limit + i + 1}`,
        phone: `+1 (555) ${String(page * limit + i + 1).padStart(
          3,
          "0"
        )}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
        email: `supplier${page * limit + i + 1}@example.com`,
      }));
      resolve(newSuppliers);
    }, 1000); // Simulate network delay
  });
};

export default function SupplierSearch() {
  const [suppliers, setSuppliers] = useState<
    Array<{
      id: number;
      name: string;
      location: string;
      phone: string;
      email: string;
    }>
  >([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  // TODO: remove and use useSuppliers
  const loadMoreSuppliers = async () => {
    if (loading) return;
    setLoading(true);
    const newSuppliers = await fetchSuppliers(page, 10);
    setSuppliers((prevSuppliers) => [...prevSuppliers, ...newSuppliers]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadMoreSuppliers();
  }, []);

  useEffect(() => {
    if (inView) {
      loadMoreSuppliers();
    }
  }, [inView]);

  return (
    <div className="min-h-screen flex flex-col pt-32">
      <header className="bg-background border-b shadow-md fixed top-14 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold mb-4">What are you craving?</h1>
          <SearchForm />
        </div>
      </header>

      <div className="flex-grow container mx-auto px-4 py-8">
        <ul className="space-y-4">
          {suppliers.map((supplier) => (
            <li
              key={supplier.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold mb-2">{supplier.name}</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  {supplier.location}
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

        <div ref={ref} className="flex justify-center mt-4">
          {loading && (
            <Loader2Icon className="animate-spin h-6 w-4 text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
}
