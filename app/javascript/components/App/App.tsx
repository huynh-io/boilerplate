import { Provider } from "react-redux";
import React from "react";
import Router from "components/App/Router";
import { RouterProvider } from "react-router-dom";
import store from "store";
import Authenticator from "./Authenticator";

// Kept here for reference if we ever need props from Rails on bootup.
//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const App = (props) => {
  return (
    <Provider store={store}>
      <Authenticator>
        <RouterProvider router={Router} />;
      </Authenticator>
    </Provider>
  );
};

export default App;
