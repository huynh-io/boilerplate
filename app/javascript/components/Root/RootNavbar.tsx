import React from "react";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "components/shared/Catalyst/navbar";
import { AppDispatch, RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "store/reducers/Authentication";
import { resetAll } from "store/sharedActions";

const RootNavbar = () => {
  const authenticated = useSelector(
    (state: RootState) => state.authentication.authenticated
  );
  const authenticatedInitialized = useSelector(
    (state: RootState) => state.authentication.initialized
  );
  const dispatch = useDispatch<AppDispatch>();

  const onSignOut = async () => {
    try {
      // Internally, createAsyncThunk handles all errors so unwrap to get errors
      // TODO: handle signout failure
      await dispatch(signOut()).unwrap();
      dispatch(resetAll());
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <Navbar>
      <NavbarItem href="/" aria-label="Home" current>
        Home
      </NavbarItem>

      <NavbarSpacer />

      {authenticatedInitialized &&
        (authenticated ? (
          <NavbarSection>
            <NavbarItem onClick={onSignOut} aria-label="Sign Out">
              Sign Out
            </NavbarItem>
          </NavbarSection>
        ) : (
          <NavbarSection>
            <NavbarItem href="/sign_in" aria-label="Sign In">
              Sign In
            </NavbarItem>
            <NavbarItem href="/sign_up" aria-label="Sign Up">
              Sign Up
            </NavbarItem>
          </NavbarSection>
        ))}
    </Navbar>
  );
};

export default RootNavbar;
