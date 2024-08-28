import { Field, Fieldset, Label, Legend } from "@headlessui/react";
import { Button } from "components/Catalyst/button";
import { Input } from "components/Catalyst/input";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import {
  signUpWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "store/SignUp";

const SignUp = () => {
  const validated = useSelector((state: RootState) => state.signUp.validated);
  const signUpStatus = useSelector((state: RootState) => state.signUp.status);
  const dispatch = useDispatch<AppDispatch>();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEmail(e.target.value));
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updatePassword(e.target.value));
  };

  const onClickSignUp = () => {
    dispatch(signUpWithEmailAndPassword());
  };

  return (
    <div className="flex w-full justify-center">
      <div className="sm:w-72 md:w-1/2">
        <Fieldset className="w-full">
          <Legend className="text-lg/7 font-semibold">Sign Up</Legend>

          <Field className="mt-4">
            <Label>Email</Label>
            <Input
              onChange={onEmailChange}
              name="email"
              type="email"
              className="mt-2"
            />
          </Field>

          <Field className="mt-4">
            <Label>Password</Label>
            <Input
              onChange={onPasswordChange}
              name="password"
              type="password"
              className="mt-2"
            />
          </Field>
        </Fieldset>

        <Button
          onClick={onClickSignUp}
          className="mt-4 w-full"
          disabled={!validated && signUpStatus !== "pending"}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
