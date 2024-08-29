import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "store";
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

// Fix page layout overflow
const Root = () => {
  const authenticated = useSelector(
    (state: RootState) => state.authentication.authenticated
  );
  const authenticatedInitialized = useSelector(
    (state: RootState) => state.authentication.initialized
  );

  const showAuthDependentContent = authenticatedInitialized && authenticated;

  const sidebar = (
    <Sidebar>
      <SidebarItem href="/" aria-label="Home" current>
        Home
      </SidebarItem>

      <SidebarSpacer />

      {showAuthDependentContent &&
        (authenticated ? (
          <SidebarSection>
            <SidebarItem href="/logOut" aria-label="Log Out">
              Log Out
            </SidebarItem>
          </SidebarSection>
        ) : (
          <SidebarSection>
            <SidebarItem href="/logIn" aria-label="Log In">
              Log In
            </SidebarItem>
            <SidebarItem href="/signUp" aria-label="Sign Up">
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
            <NavbarItem href="/logOut" aria-label="Log Out">
              Log Out
            </NavbarItem>
          </NavbarSection>
        ) : (
          <NavbarSection>
            <NavbarItem href="/logIn" aria-label="Log In">
              Log In
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
