import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "services/Firebase";

export interface SignUpState {
  status: "idle" | "pending" | "succeeded" | "rejected";
}

const initialState: SignUpState = {
  status: "idle",
};

export const signInWithGoogle = createAsyncThunk(
  "signIn/signInWithGoogle",
  async (args, thunkAPI) => {
    const userCredential = await signInWithPopup(
      firebaseAuth,
      googleAuthProvider
    );

    return userCredential.user;
  }
);

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export default signInSlice.reducer;
