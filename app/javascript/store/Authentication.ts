import { createSlice } from "@reduxjs/toolkit";

export interface AuthenticationState {
  authenticated: boolean;
  initialized: boolean;
  user: any;
}

const initialState: AuthenticationState = {
  authenticated: false,
  initialized: false,
  user: null,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.authenticated = action.payload;
      state.initialized = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate } = authenticationSlice.actions;

export default authenticationSlice.reducer;
