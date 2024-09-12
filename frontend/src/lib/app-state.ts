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

export interface MobileSlice {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

type AppState = AuthenticationSlice & MobileSlice;

export default AppState;
