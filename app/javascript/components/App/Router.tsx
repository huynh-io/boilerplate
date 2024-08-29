import Home from "components/Home";
import Root from "components/Root";
import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "/sign_in", element: <SignIn /> },
      { path: "/sign_up", element: <SignUp /> },
    ],
  },
]);

export default Router;
