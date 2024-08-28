import Root from "components/Root";
import SignUp from "components/SignUp";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [{ path: "/signUp", element: <SignUp /> }],
  },
]);

export default Router;
