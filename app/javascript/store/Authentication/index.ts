import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "services/Firebase";

interface SignUpParams {
  email: string;
  password: string;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

export const signUp = createAsyncThunk(
  "authentication/firebase/createUserWithEmailAndPassword",
  async (params: SignUpParams) => {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      params.email,
      params.password
    );

    return userCredential.user;
  }
);

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
    login: (state) => {
      state.authenticated = true;
    },
    logout: (state) => {
      state.authenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.status = "pending";
        state.authenticated = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "rejected";
        state.authenticated = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
