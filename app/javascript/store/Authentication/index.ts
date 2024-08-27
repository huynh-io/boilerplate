import { createSlice } from "@reduxjs/toolkit";

export interface AuthenticationState {
  authenticated: boolean;
}

const initialState: AuthenticationState = {
  authenticated: false,
};

export const authenticationSlice = createSlice({
  name: "authenticaiton",
  initialState,
  reducers: {
    login: (state) => {
      state.authenticated = true;
    },
    logout: (state) => {
      state.authenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
