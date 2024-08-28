import { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./Authentication";
import signUpReducer from "./SignUp";
import signInReducer from "./SignIn";

export const store = configureStore({
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

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
