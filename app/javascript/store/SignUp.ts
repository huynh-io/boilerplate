import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "services/Firebase";
import { RootState } from "store";

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

export const signUpWithEmailAndPassword = createAsyncThunk(
  "signUp/createUserWithEmailAndPassword",
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

// TODO: better validation, move into utils
const validate = (email: string, password: string): boolean => {
  return !!email && !!password;
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
      state.validated = validate(state.email, state.password);
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
      state.validated = validate(state.email, state.password);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpWithEmailAndPassword.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(signUpWithEmailAndPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(signUpWithEmailAndPassword.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { updateEmail, updatePassword } = signUpSlice.actions;

export default signUpSlice.reducer;
