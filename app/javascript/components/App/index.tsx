import React from "react";
import Router from "components/App/Router";
import { RouterProvider } from "react-router-dom";

const App = (props) => {
  return <RouterProvider router={Router} />;
};

export default App;
