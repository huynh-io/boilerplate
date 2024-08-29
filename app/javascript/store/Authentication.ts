import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firebaseAuth } from "services/Firebase";
import { signOut as firebaseSignOut } from "firebase/auth";

export interface AuthenticationState {
  authenticated: boolean;
  initialized: boolean;
  signOutStatus: "idle" | "pending" | "succeeded" | "rejected";
  user: any;
}

const initialState: AuthenticationState = {
  authenticated: false,
  initialized: false,
  signOutStatus: "idle",
  user: null,
};

export const signOut = createAsyncThunk(
  "authentication/signOut",
  async (args, thunkAPI) => {
    firebaseSignOut(firebaseAuth);
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.authenticated = action.payload;
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOut.pending, (state, action) => {
        state.initialized = true;
        state.signOutStatus = "pending";
        state.authenticated = true;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.initialized = true;
        state.signOutStatus = "succeeded";
        state.authenticated = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.initialized = true;
        // TODO: sign out failed
        state.signOutStatus = "rejected";
        state.authenticated = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { authenticate } = authenticationSlice.actions;

export default authenticationSlice.reducer;
