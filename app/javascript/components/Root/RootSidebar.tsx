import React from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarSection,
  SidebarSpacer,
} from "components/shared/Catalyst/sidebar";
import { AppDispatch, RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "store/reducers/Authentication";
import { resetAll } from "store/sharedActions";

const RootSidebar = () => {
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
    <Sidebar>
      <SidebarItem href="/" aria-label="Home" current>
        Home
      </SidebarItem>

      <SidebarSpacer />

      {authenticatedInitialized &&
        (authenticated ? (
          <SidebarSection>
            <SidebarItem onClick={onSignOut} aria-label="Sign Out">
              Sign Out
            </SidebarItem>
          </SidebarSection>
        ) : (
          <SidebarSection>
            <SidebarItem href="/sign_in" aria-label="Sign In">
              Sign In
            </SidebarItem>
            <SidebarItem href="/sign_up" aria-label="Sign Up">
              Sign Up
            </SidebarItem>
          </SidebarSection>
        ))}
    </Sidebar>
  );
};

export default RootSidebar;
