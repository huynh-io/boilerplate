import { Provider } from "react-redux";
import React from "react";
import Router from "components/App/Router";
import { RouterProvider } from "react-router-dom";
import { store } from "store";

const App = (props) => {
  return (
    <Provider store={store}>
      <RouterProvider router={Router} />;
    </Provider>
  );
};

export default App;
