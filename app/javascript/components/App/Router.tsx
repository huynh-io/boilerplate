import Home from "components/Home";
import Root from "components/Root";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [{ path: "/home", element: <Home /> }],
  },
]);

export default Router;
