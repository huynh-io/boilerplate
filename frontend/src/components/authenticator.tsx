"use client";

import { useEffect } from "react";
import { firebaseAuth } from "@/lib/firebase";
import { useAppStore, AppState } from "@/lib/app-store";
import FullPageSpinner from "./full-page-spinner";

export default function Authenticator(props: { children: React.ReactNode }) {
  const { authenticate, authenticationInitialized, initializedAuthentication } =
    useAppStore((state: AppState) => {
      return {
        authenticated: state.authenticated,
        authenticate: state.authenticate,
        authenticationInitialized: state.authenticationInitialized,
        initializedAuthentication: state.initializedAuthentication,
      };
    });

  useEffect(() => {
    // Run only once on mount.
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      // Auth is only initialized once we start receiving auth state events.
      initializedAuthentication();
      authenticate(user !== null);
    });

    // Return this so React will run cleanup when the component unmounts.
    return () => {
      unsubscribe();
    };
    // Need the [] to ensure this only runs once.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!authenticationInitialized) {
    return <FullPageSpinner />;
  }

  return props.children;
}
