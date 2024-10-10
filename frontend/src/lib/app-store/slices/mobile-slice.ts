import { StateCreator } from "zustand";
import { sliceResetFns } from "./reset";

export interface MobileSlice {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const initialMobileState: MobileSlice = {
  isMobileMenuOpen: false,
  setMobileMenuOpen: () => {},
};

export const createMobileSlice: StateCreator<MobileSlice> = (set) => {
  sliceResetFns.add(() => set(initialMobileState));

  return {
    ...initialMobileState,
    setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  };
};
