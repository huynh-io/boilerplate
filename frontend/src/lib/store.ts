import { create } from "zustand";
import AppState from "@/lib/app-state";
import { createAuthenticationSlice } from "@/lib/slices/authentication-slice";
import { createMobileSlice } from "@/lib/slices/mobile-slice";

// TODO:
// - fix redux chrome devtools integration
const useAppStore = create<AppState>()((...a) => ({
  ...createAuthenticationSlice(...a),
  ...createMobileSlice(...a),
}));

export default useAppStore;
