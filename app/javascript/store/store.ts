import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./Authentication";
import signUpReducer from "./SignUp";
import signInReducer from "./SignIn";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    signUp: signUpReducer,
    signIn: signInReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // TODO: Consider making this more nuanced
      serializableCheck: false,
    }),
});

export default store;
