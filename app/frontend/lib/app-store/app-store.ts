import { create } from "zustand";
import { persist } from "zustand/middleware";
import AppState from "./app-state";
import { createAuthenticationSlice } from "./slices/authentication-slice";
import { createMobileSlice } from "./slices/mobile-slice";
import { sliceResetFns } from "./slices/reset";

export const resetAppStore = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn();
  });
};

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createAuthenticationSlice(...a),
      ...createMobileSlice(...a),
    }),
    {
      name: "app-store",
      partialize: (state) => ({ accessToken: state.accessToken, authenticated: state.authenticated }),
    }
  )
);
