"use client";

import { useEffect } from "react";
import { firebaseAuth } from "@/lib/firebase";
import useAppStore, { AppState } from "@/lib/store";

const Authenticator = (props: { children: any }) => {
  const { authenticated, authenticate } = useAppStore((state: AppState) => {
    return {
      authenticated: state.authenticated,
      authenticate: state.authenticate,
    };
  });

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        authenticate(true);
      } else {
        authenticate(false);
      }
    });
  }, [authenticated]);

  return props.children;
};

export default Authenticator;
