"use client";

import { useEffect } from "react";
import { firebaseAuth } from "@/lib/firebase";
import { useAppStore, AppState } from "@/lib/app-store";
import FullPageSpinner from "./full-page-spinner";
import { useUsersVerifyIdToken } from "@/lib/api-store";

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

  const verifyIdToken = useUsersVerifyIdToken();

  useEffect(() => {
    // Run only once on mount.
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      // Auth is only initialized once we start receiving auth state events.
      initializedAuthentication();
      authenticate(user !== null);

      // TODO:
      // - frontend sets API key on header for further calls to api
      if (user) {
        user.getIdToken().then((idToken) => {
          verifyIdToken.mutate(idToken);
        });
      }
    });

    // Return this so React will run cleanup when the component unmounts.
    return () => {
      unsubscribe();
    };
    // Need the [] to ensure this only runs once.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!authenticationInitialized || verifyIdToken.isPending) {
    return <FullPageSpinner />;
  }

  if (verifyIdToken.isError) {
    return <div>Error verifying id token</div>;
  }

  return props.children;
}
