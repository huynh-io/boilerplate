import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "store";
import { login, logout } from "store/Authentication";

const Root = () => {
  const authenticated = useSelector(
    (state: RootState) => state.authentication.authenticated
  );
  const dispatch = useDispatch();

  return (
    <>
      <div>Root</div>
      <div>{authenticated ? "Logged In" : "Logged Out"}</div>
      <button aria-label="Login" onClick={() => dispatch(login())}>
        Login
      </button>
      <button aria-label="Login" onClick={() => dispatch(logout())}>
        Logout
      </button>
      <Outlet />
    </>
  );
};

export default Root;
