"use client";

import { useEffect } from "react";
import { useAppStore, AppState } from "@/lib/app-store";
import FullPageSpinner from "./full-page-spinner";
import { useUsersCreate, firebaseAuth } from "@/lib/api-store";

export default function Authenticator(props: { children: React.ReactNode }) {
  const { mutate: createUser, data, error } = useUsersCreate();
  const { authenticationInitialized } = useAppStore((state: AppState) => {
    return { authenticationInitialized: state.authenticationInitialized };
  });

  // Run only once on mount.
  useEffect(() => {
    // This is a Firebase event listener that will call the callback function
    // whenever the auth state changes.
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      async (firebaseUser) => {
        // Auth is only initialized once we start receiving auth state events.
        useAppStore.setState({
          authenticationInitialized: true,
        });

        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken();
          await createUser(idToken);

          useAppStore.setState({
            authenticated: true,
            idToken,
          });
        } else {
          useAppStore.setState({
            authenticated: false,
            idToken: undefined,
            currentUser: undefined,
          });
        }
      }
    );

    // Return this so React will run cleanup when the component unmounts.
    return () => {
      unsubscribe();
    };
    // Need the [] to ensure this only runs once.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Run whenever we get the current user from the API.
  useEffect(() => {
    if (data) {
      useAppStore.setState({
        currentUser: data,
      });
    }

    if (error) {
      useAppStore.setState({
        currentUser: undefined,
      });
    }
  }, [data, error]);

  if (!authenticationInitialized) {
    return <FullPageSpinner />;
  }

  return props.children;
}
