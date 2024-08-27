import React from "react";
import Router from "./Router";
import { RouterProvider } from "react-router-dom";

const App = (props) => <RouterProvider router={Router} />;

export default App;

// // // import { Provider } from "react-redux";

// // // See documentation for https://github.com/reactjs/react-redux.
// // // This is how you get props from the Rails view into the redux store.
// // // This code here binds your smart component to the redux store.

// export default App;
