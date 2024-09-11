"use client";

import { useEffect } from "react";
import { firebaseAuth } from "@/lib/firebase";
import useAppStore, { AppState } from "@/lib/store";
import { useRouter } from "next/navigation";
import FullPageSpinner from "./full-page-spinner";

const Authenticator = (props: { children: React.ReactNode }) => {
  const router = useRouter();

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

      if (user) {
        authenticate(true);
        router.push("/");
      } else {
        authenticate(false);
        router.push("/");
      }
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
};

export default Authenticator;
