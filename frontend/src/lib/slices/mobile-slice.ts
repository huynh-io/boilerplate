import { StateCreator } from "zustand";
import { MobileSlice } from "@/lib/app-state";

export const createMobileSlice: StateCreator<MobileSlice> = (set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
});
