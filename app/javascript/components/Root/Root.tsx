import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "store";
import { StackedLayout } from "components/shared/Catalyst/stacked-layout";
import RootSidebar from "./RootSidebar";
import RootNavbar from "./RootNavbar";

// Fix page layout overflow
const Root = () => {
  const authenticated = useSelector(
    (state: RootState) => state.authentication.authenticated
  );
  const authenticatedInitialized = useSelector(
    (state: RootState) => state.authentication.initialized
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticatedInitialized && !authenticated) {
      navigate("/");
    }
  }, [authenticatedInitialized, authenticated]);

  const baseStyleWrappedOutlet = (
    <div className="text-base/7 text-zinc-950 dark:text-white bg-white dark:bg-zinc-900 dark:border-white/10">
      {authenticatedInitialized && <Outlet />}
    </div>
  );

  return (
    <StackedLayout sidebar={<RootSidebar />} navbar={<RootNavbar />}>
      {baseStyleWrappedOutlet}
    </StackedLayout>
  );
};

export default Root;
