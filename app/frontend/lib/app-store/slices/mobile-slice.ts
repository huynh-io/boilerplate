import { StateCreator } from "zustand";
import { sliceResetFns } from "./reset";

export interface MobileSlice {
  isMobileMenuOpen: boolean;
}

const initialMobileState: MobileSlice = {
  isMobileMenuOpen: false,
};

export const createMobileSlice: StateCreator<MobileSlice> = (set) => {
  sliceResetFns.add(() => set(initialMobileState));

  return {
    ...initialMobileState,
  };
};
