import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
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
import { signOut } from "store/reducers/Authentication";
import { resetAll } from "store/sharedActions";

// Fix page layout overflow
const Root = () => {
  const authenticated = useSelector(
    (state: RootState) => state.authentication.authenticated
  );
  const authenticatedInitialized = useSelector(
    (state: RootState) => state.authentication.initialized
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSignOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    if (authenticatedInitialized && !authenticated) {
      navigate("/");
    }
  }, [authenticatedInitialized, authenticated]);

  const sidebar = (
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

  const navbar = (
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

  const baseStyleWrappedOutlet = (
    <div className="text-base/7 text-zinc-950 dark:text-white bg-white dark:bg-zinc-900 dark:border-white/10">
      {authenticatedInitialized && <Outlet />}
    </div>
  );

  return (
    <StackedLayout sidebar={sidebar} navbar={navbar}>
      {baseStyleWrappedOutlet}
    </StackedLayout>
  );
};

export default Root;
