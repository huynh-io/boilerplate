import React from "react";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { store } from "store";

const Root = () => {
  return (
    <Provider store={store}>
      <div>Root</div>
      <Outlet />
    </Provider>
  );
};

export default Root;
