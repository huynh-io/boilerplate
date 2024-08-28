import { Field, Fieldset, Label, Legend } from "@headlessui/react";
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from "components/Catalyst/alert";
import { Button } from "components/Catalyst/button";
import { Input } from "components/Catalyst/input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import {
  signUpWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "store/SignUp";

const SignUp = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    if (signUpStatus === "rejected") {
      setIsOpen(true);
    }
  }, [signUpStatus]);

  return (
    <>
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
      <Alert open={isOpen} onClose={setIsOpen}>
        <AlertTitle>Sign Up Error</AlertTitle>
        <AlertDescription>
          Looks like something went wrong with the sign up process. Check your
          email and password and try again.
        </AlertDescription>
        <AlertActions>
          <Button onClick={() => setIsOpen(false)}>Ok</Button>
        </AlertActions>
      </Alert>
    </>
  );
};

export default SignUp;
