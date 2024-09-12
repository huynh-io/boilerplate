import { create } from "zustand";
import AppState from "./app-state";
import { createAuthenticationSlice } from "./slices/authentication-slice";
import { createMobileSlice } from "./slices/mobile-slice";

// TODO:
// - fix redux chrome devtools integration
const useAppStore = create<AppState>()((...a) => ({
  ...createAuthenticationSlice(...a),
  ...createMobileSlice(...a),
}));

export default useAppStore;
