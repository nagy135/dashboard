"use client";

import { useFormStatus } from "react-dom";
import { login } from "@/app/actions/auth";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [actionResult, action] = useActionState(login, undefined);

  return (
    <div className="w-4/5 md:w-1/2 mx-auto h-screen flex flex-row items-center">
      <form action={action} className="w-full flex flex-col space-y-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            defaultValue={"admin"}
          />
        </div>
        {actionResult?.errors?.name && <p>{actionResult.errors.name}</p>}

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={"admin"}
          />
        </div>
        {actionResult?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {actionResult.errors.password.map((error: any) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      Login
    </Button>
  );
}
