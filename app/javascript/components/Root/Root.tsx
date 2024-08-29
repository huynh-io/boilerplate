import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "components/shared/Catalyst/navbar";
import {
  Sidebar,
  SidebarItem,
  SidebarSection,
  SidebarSpacer,
} from "components/shared/Catalyst/sidebar";
import { StackedLayout } from "components/shared/Catalyst/stacked-layout";
import { signOut } from "store/Authentication";

// Fix page layout overflow
const Root = () => {
  const authenticated = useSelector(
    (state: RootState) => state.authentication.authenticated
  );
  const authenticatedInitialized = useSelector(
    (state: RootState) => state.authentication.initialized
  );
  const dispatch = useDispatch<AppDispatch>();

  const showAuthDependentContent = authenticatedInitialized && authenticated;

  const onSignOut = () => {
    dispatch(signOut());
  };

  const sidebar = (
    <Sidebar>
      <SidebarItem href="/" aria-label="Home" current>
        Home
      </SidebarItem>

      <SidebarSpacer />

      {showAuthDependentContent &&
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

  const navbar = (
    <Navbar>
      <NavbarItem href="/" aria-label="Home" current>
        Home
      </NavbarItem>

      <NavbarSpacer />

      {showAuthDependentContent &&
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
            <NavbarItem href="/signUp" aria-label="Sign Up">
              Sign Up
            </NavbarItem>
          </NavbarSection>
        ))}
    </Navbar>
  );

  const baseStyleWrappedOutlet = (
    <div className="text-base/7 text-zinc-950 dark:text-white bg-white dark:bg-zinc-900 dark:border-white/10">
      {showAuthDependentContent && <Outlet />}
    </div>
  );

  return (
    <StackedLayout sidebar={sidebar} navbar={navbar}>
      {baseStyleWrappedOutlet}
    </StackedLayout>
  );
};

export default Root;
