"use client";

import { useFormStatus } from "react-dom";
import { logout } from "@/app/actions/auth";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";

export function LogoutForm() {
  const [_, action] = useActionState(logout, undefined);

  return (
    <form action={action}>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      Logout
    </Button>
  );
}
