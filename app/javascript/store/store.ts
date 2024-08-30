import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./reducers/Authentication";
import signUpReducer from "./reducers/SignUp";
import signInReducer from "./reducers/SignIn";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    signUp: signUpReducer,
    signIn: signInReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // TODO: Consider making this more nuanced, we just need to return a POJO in the async thunk's inner function
      serializableCheck: false,
    }),
});

export default store;
