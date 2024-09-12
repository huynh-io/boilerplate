export interface AuthenticationSlice {
  authenticated: boolean;
  authenticationInitialized: boolean;
  authenticate: (auth: boolean) => void;
  initializedAuthentication: () => void;
  signInWithEmail: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  signOut: () => void;
  signUpWithEmail: (email: string, password: string) => void;
}

export interface SupplierSlice {
  suppliers: [];
  selectedSupplier: null;
}

type AppState = AuthenticationSlice & SupplierSlice;

export default AppState;
