import React from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div>Hi</div>
      <Outlet />
    </>
  );
};

export default Root;
