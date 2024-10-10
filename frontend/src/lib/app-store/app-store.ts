import { create } from "zustand";
import AppState from "./app-state";
import { createAuthenticationSlice } from "./slices/authentication-slice";
import { createMobileSlice } from "./slices/mobile-slice";
import { sliceResetFns } from "./slices/reset";

export const resetAppStore = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn();
  });
};

export const useAppStore = create<AppState>()((...a) => ({
  ...createAuthenticationSlice(...a),
  ...createMobileSlice(...a),
}));
