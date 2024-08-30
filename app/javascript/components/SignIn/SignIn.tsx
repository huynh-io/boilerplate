import { Field, Fieldset, Label, Legend } from "@headlessui/react";
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from "components/shared/Catalyst/alert";
import { Button } from "components/shared/Catalyst/button";
import { Input } from "components/shared/Catalyst/input";
import SignInWithGoogleButton from "components/shared/SignInWithGoogleButton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import {
  signInWithCredentials,
  signInWithGoogle,
  updateEmail,
  updatePassword,
} from "store/reducers/SignIn";

const SignIn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const validated = useSelector((state: RootState) => state.signIn.validated);
  const signInStatus = useSelector((state: RootState) => state.signIn.status);

  const dispatch = useDispatch<AppDispatch>();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEmail(e.target.value));
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updatePassword(e.target.value));
  };

  const onClickSignIn = () => {
    dispatch(signInWithCredentials());
  };

  const onClickSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  useEffect(() => {
    switch (signInStatus) {
      case "succeeded":
        navigate("/");
        return;
      case "rejected":
        setIsOpen(true);
        return;
    }
  }, [signInStatus]);

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="sm:w-72 md:w-1/2">
          <Fieldset className="w-full">
            <Legend className="text-lg/7 font-semibold">Sign In</Legend>

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
            onClick={onClickSignIn}
            className="mt-4 w-full"
            disabled={!validated && signInStatus !== "pending"}
          >
            Sign In
          </Button>

          <SignInWithGoogleButton
            onClick={onClickSignInWithGoogle}
            className="mt-4 w-full flex justify-center items-center"
          />
        </div>
      </div>

      <Alert open={isOpen} onClose={setIsOpen}>
        <AlertTitle>Sign In Error</AlertTitle>
        <AlertDescription>
          Looks like something went wrong with the sign in process. Check your
          email and password and try again.
        </AlertDescription>
        <AlertActions>
          <Button onClick={() => setIsOpen(false)}>Ok</Button>
        </AlertActions>
      </Alert>
    </>
  );
};

export default SignIn;
