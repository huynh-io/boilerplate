import React from "react";
import type { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "store/Authentication";

const Home = () => {
  const authenticated = useSelector(
    (state: RootState) => state.authentication.authenticated
  );
  const dispatch = useDispatch();

  return (
    <>
      <div>Home</div>
      <div>{authenticated ? "Logged In" : "Logged Out"}</div>
      <button aria-label="Login" onClick={() => dispatch(login())}>
        Login
      </button>
      <button aria-label="Login" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </>
  );
};

export default Home;
