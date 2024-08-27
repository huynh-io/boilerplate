import React from "react";
import { Provider } from "react-redux";

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
const App = (props) => (
  <div>Hi</div>
  // <Provider store={configureStore(props)}>
  //   <AppContainer />
  // </Provider>
);

export default App;
