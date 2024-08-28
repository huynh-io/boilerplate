import { Field, Fieldset, Label, Legend } from "@headlessui/react";
import { Input } from "components/Catalyst/input";
import React from "react";

const SignUp = () => {
  return (
    <div className="justify-center justify-items-center bg-white dark:bg-zinc-900 dark:border-white/10">
      <div>
        <Fieldset className="text-zinc-950 sm:text-base/7 dark:text-white">
          <Legend className="text-lg/7 font-semibold">Sign Up</Legend>
          <Field>
            <Label>Email</Label>
            <Input name="email" type="email" />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input name="password" type="password" />
          </Field>
        </Fieldset>
      </div>
    </div>
  );
};

export default SignUp;
