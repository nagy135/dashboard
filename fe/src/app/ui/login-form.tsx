"use client";

import { useFormStatus } from "react-dom";
import { login } from "@/app/actions/auth";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [accessToken, action] = useActionState(login, undefined);

  return (
    <div className="w-1/2 mx-auto">
      <form action={action}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            defaultValue={"admin"}
          />
        </div>
        {accessToken?.errors?.name && <p>{accessToken.errors.name}</p>}

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={"admin"}
          />
        </div>
        {accessToken?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {accessToken.errors.password.map((error: any) => (
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
