import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "services/Firebase";
import { RootState } from "store";
import { resetAll } from "store/sharedActions";
import { validateEmailAndPassword } from "utils/validators";

export interface SignUpState {
  email: string | null;
  password: string | null;
  validated: boolean;
  status: "idle" | "pending" | "succeeded" | "rejected";
}

const initialState: SignUpState = {
  email: null,
  password: null,
  validated: false,
  status: "idle",
};

export const signUpWithCredentials = createAsyncThunk(
  "signUp/withCredentials",
  async (args, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      state.signUp.email,
      state.signUp.password
    );

    return userCredential.user;
  }
);

export const signUpSlice = createSlice({
  name: "signUp",
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
      .addCase(signUpWithCredentials.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(signUpWithCredentials.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(signUpWithCredentials.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(resetAll, (state, action) => {
        initialState;
      });
  },
});

export const { updateEmail, updatePassword } = signUpSlice.actions;

export default signUpSlice.reducer;
