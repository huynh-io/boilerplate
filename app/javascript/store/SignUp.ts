import { createSlice } from "@reduxjs/toolkit";

export interface SignUpState {
  email: string | null;
  password: string | null;
  validated: boolean;
}

const initialState: SignUpState = {
  email: null,
  password: null,
  validated: false,
};

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
});

export const { updateEmail, updatePassword } = signUpSlice.actions;

export default signUpSlice.reducer;
