import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "store";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "components/Catalyst/navbar";
import {
  Sidebar,
  SidebarItem,
  SidebarSection,
  SidebarSpacer,
} from "components/Catalyst/sidebar";
import { StackedLayout } from "components/Catalyst/stacked-layout";

// const Root = () => {
//   const authenticated = useSelector(
//     (state: RootState) => state.authentication.authenticated
//   );
//   const dispatch = useDispatch();

//   return (
//     <>
//       <div>Root</div>
//       <div>{authenticated ? "Logged In" : "Logged Out"}</div>
//       <button aria-label="Signup" onClick={() => console.log("1")}>
//         Signup
//       </button>
//       <button aria-label="Login" onClick={() => dispatch(login())}>
//         Login
//       </button>
//       <button aria-label="Login" onClick={() => dispatch(logout())}>
//         Logout
//       </button>
//       <Outlet />
//     </>
//   );
// };

const Root = () => {
  const authenticated = useSelector(
    (state: RootState) => state.authentication.authenticated
  );

  const sidebar = (
    <Sidebar>
      <SidebarItem href="/" aria-label="Home" current>
        Home
      </SidebarItem>

      <SidebarSpacer />

      {authenticated ? (
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
      )}
    </Sidebar>
  );

  const navbar = (
    <Navbar>
      <NavbarItem href="/" aria-label="Home" current>
        Home
      </NavbarItem>

      <NavbarSpacer />

      {authenticated ? (
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
      )}
    </Navbar>
  );

  const baseStyleWrappedOutlet = (
    <div className="text-base/7 text-zinc-950 dark:text-white bg-white dark:bg-zinc-900 dark:border-white/10">
      <Outlet />
    </div>
  );

  return (
    <StackedLayout sidebar={sidebar} navbar={navbar}>
      {baseStyleWrappedOutlet}
    </StackedLayout>
  );
};

export default Root;
