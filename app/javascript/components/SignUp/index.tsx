import { Field, Fieldset, Label, Legend } from "@headlessui/react";
import { Button } from "components/Catalyst/button";
import { Input } from "components/Catalyst/input";
import React from "react";

const SignUp = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="sm:w-72 md:w-1/2">
        <Fieldset className="w-full">
          <Legend className="text-lg/7 font-semibold">Sign Up</Legend>
          <Field className="mt-4">
            <Label>Email</Label>
            <Input name="email" type="email" className="mt-2" />
          </Field>
          <Field className="mt-4">
            <Label>Password</Label>
            <Input name="password" type="password" className="mt-2" />
          </Field>
        </Fieldset>
        <Button className="mt-4 w-full">Sign Up</Button>
      </div>
    </div>
  );
};

export default SignUp;
