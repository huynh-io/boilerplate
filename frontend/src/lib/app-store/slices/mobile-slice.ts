import { StateCreator } from "zustand";

export interface MobileSlice {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}
export const createMobileSlice: StateCreator<MobileSlice> = (set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
});
