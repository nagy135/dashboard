"use server";

import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch("http://backend:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.get("name"),
      password: formData.get("password"),
    }),
  });
  const body = await response.json();

  const cookiesStore = await cookies();
  cookiesStore.set("access_token", body.access_token);

  redirect("/dashboard");
}

export async function logout() {
  const cookiesStore = await cookies();
  cookiesStore.delete("access_token");
  redirect("/");
}
