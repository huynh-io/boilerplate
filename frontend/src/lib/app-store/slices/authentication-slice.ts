import { StateCreator } from "zustand";
import { User } from "@/lib/api-store";

export interface AuthenticationSlice {
  authenticated: boolean;
  authenticationInitialized: boolean;
  currentUser?: User;
  idToken?: string;
}

export const createAuthenticationSlice: StateCreator<
  AuthenticationSlice
> = () => ({
  authenticated: false,
  authenticationInitialized: false,
  idToken: undefined,
  currentUser: undefined,
});
