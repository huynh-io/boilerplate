"use client";

import { useEffect, useState } from "react";
import { firebaseAuth } from "@/lib/firebase";
import useAppStore, { AppState } from "@/lib/store";
import { useRouter } from "next/navigation";
import FullPageSpinner from "./full-page-spinner";

const Authenticator = (props: { children: any }) => {
  const router = useRouter();

  const {
    authenticated,
    authenticate,
    authenticationInitialized,
    initializedAuthentication,
  } = useAppStore((state: AppState) => {
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
        router.push("/about");
      } else {
        authenticate(false);
        router.push("/");
      }
    });

    // Return this so React will run cleanup when the component unmounts.
    return () => {
      unsubscribe();
    };
  }, []);

  if (!authenticationInitialized) {
    return <FullPageSpinner />;
  }

  return props.children;
};

export default Authenticator;
