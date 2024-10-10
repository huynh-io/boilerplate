"use client";

import { useEffect } from "react";
import { useAppStore, resetAppStore } from "@/lib/app-store";
import FullPageSpinner from "./full-page-spinner";
import { useCreateUser, firebaseAuth, useGetUsersMe } from "@/lib/api-store";
import { apiQueryClient } from "@/lib/api-store";

export default function Authenticator(props: { children: React.ReactNode }) {
  const { firebaseInitialized } = useAppStore((state) => {
    return { firebaseInitialized: state.firebaseInitialized };
  });
  const {
    mutate: createUser,
    data: currentUser,
    status: createUserStatus,
  } = useCreateUser();

  // Fetch the user profile data if the user is authenticated.
  useGetUsersMe({
    enabled: createUserStatus === "success",
  });

  // Run only once on mount.
  useEffect(() => {
    // This is a Firebase event listener that will call the callback function
    // whenever the auth state changes.
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      async (firebaseUser) => {
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken();
          createUser(idToken);
        } else {
          resetAppStore();
          apiQueryClient.clear();
        }

        // Always set at the end since we reset the store if the user is not authenticated.
        useAppStore.setState({ firebaseInitialized: true });
      }
    );

    // Return this so React will run cleanup when the component unmounts.
    return () => {
      unsubscribe();
    };
    // Need the [] to ensure this only runs once and only sets one listener.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (createUserStatus === "success") {
      useAppStore.setState({
        authenticated: true,
        accessToken: currentUser.accessToken,
      });
    } else {
      useAppStore.setState({
        authenticated: false,
        accessToken: undefined,
      });
    }
  }, [createUserStatus, currentUser]);

  if (
    createUserStatus === "pending" ||
    (createUserStatus === "idle" && !firebaseInitialized)
  ) {
    return <FullPageSpinner />;
  }

  return props.children;
}
