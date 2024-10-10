import { StateCreator } from "zustand";
import { User } from "@/lib/api-store";
import { sliceResetFns } from "./reset";

export interface AuthenticationSlice {
  authenticated: boolean;
  accessToken?: string;
}

const initialAuthenticationState: AuthenticationSlice = {
  authenticated: false,
  accessToken: undefined,
};

export const createAuthenticationSlice: StateCreator<AuthenticationSlice> = (
  set
) => {
  sliceResetFns.add(() => set(initialAuthenticationState));

  return {
    ...initialAuthenticationState,
  };
};
