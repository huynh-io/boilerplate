/**
 * TODO: Update this component to use your client-side framework's link
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import * as Headless from "@headlessui/react";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export const Link = forwardRef(function Link(
  props: { href: string } & React.ComponentPropsWithoutRef<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  // We use react-router's useNavigate hook to handle client-side navigation
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(props.href);
  };

  return (
    <Headless.DataInteractive>
      <a onClick={handleClick} {...props} ref={ref} />
    </Headless.DataInteractive>
  );
});
