import { create } from "zustand";
import AppState from "@/lib/app-state";
import { createAuthenticationSlice } from "@/lib/slices/authentication-slice";
import { createSupplierSlice } from "@/lib/slices/supplier-slice";

// TODO:
// - fix redux chrome devtools integration
const useAppStore = create<AppState>()((...a) => ({
  ...createAuthenticationSlice(...a),
  ...createSupplierSlice(...a),
}));

export default useAppStore;
