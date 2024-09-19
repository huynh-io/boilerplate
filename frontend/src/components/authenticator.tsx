"use client";

import { useEffect } from "react";
import { firebaseAuth } from "@/lib/firebase";
import { useAppStore, AppState } from "@/lib/app-store";
import FullPageSpinner from "./full-page-spinner";
import { useUsersVerifyIdToken } from "@/lib/api-store";

export default function Authenticator(props: { children: React.ReactNode }) {
  const { authenticationInitialized } = useAppStore((state: AppState) => {
    return { authenticationInitialized: state.authenticationInitialized };
  });

  useEffect(() => {
    // Run only once on mount.
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      // Auth is only initialized once we start receiving auth state events.
      useAppStore.setState({
        authenticationInitialized: true,
      });

      if (user) {
        user.getIdToken().then((idToken) => {
          useAppStore.setState({
            authenticated: true,
            idToken,
          });
        });
      } else {
        useAppStore.setState({
          authenticated: false,
          idToken: undefined,
        });
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
}
