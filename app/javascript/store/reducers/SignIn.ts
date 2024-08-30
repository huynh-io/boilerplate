import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "services/Firebase";
import { RootState } from "store";
import { resetAll } from "store/sharedActions";
import { validateEmailAndPassword } from "utils/validators";

export interface SignInState {
  email: string | null;
  password: string | null;
  validated: boolean;
  status: "idle" | "pending" | "succeeded" | "rejected";
}

const initialState: SignInState = {
  email: null,
  password: null,
  validated: false,
  status: "idle",
};

export const signInWithCredentials = createAsyncThunk(
  "signIn/withCredentials",
  async (args, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      state.signIn.email,
      state.signIn.password
    );

    return userCredential.user;
  }
);

export const signInWithGoogle = createAsyncThunk(
  "signIn/withGoogle",
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
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
      state.validated = validateEmailAndPassword(state.email, state.password);
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
      state.validated = validateEmailAndPassword(state.email, state.password);
    },
  },
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
      })
      .addCase(resetAll, (state, action) => {
        initialState;
      });
  },
});

export const { updateEmail, updatePassword } = signInSlice.actions;

export default signInSlice.reducer;
