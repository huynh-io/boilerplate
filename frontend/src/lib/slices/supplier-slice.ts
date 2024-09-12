import { StateCreator } from "zustand";
import { SupplierSlice } from "@/lib/app-state";

export const createSupplierSlice: StateCreator<SupplierSlice> = () => ({
  suppliers: [],
  selectedSupplier: null,
});
