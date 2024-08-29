import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebaseAuth } from "services/Firebase";
import { AppDispatch, RootState } from "store";
import { authenticate } from "store/Authentication";

const Authenticator = (props) => {
  const authenticated = useSelector(
    (state: RootState) => state.authentication.authenticated
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authenticate(true));
        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // ...
      } else {
        dispatch(authenticate(false));
        // User is signed out.
        // ...
      }
    });

    return () => {
      unsubscribe();
    };
  }, [authenticated]);

  return <>{props.children}</>;
};

export default Authenticator;
