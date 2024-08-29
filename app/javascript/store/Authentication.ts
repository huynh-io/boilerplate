import { createSlice } from "@reduxjs/toolkit";

export interface AuthenticationState {
  authenticated: boolean;
  status: "idle" | "pending" | "succeeded" | "rejected";
  user: any;
}

const initialState: AuthenticationState = {
  authenticated: false,
  status: "idle",
  user: null,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate } = authenticationSlice.actions;

export default authenticationSlice.reducer;
