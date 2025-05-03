"use server";

import { auth } from "@/lib/auth/server";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { inspect } from "util";
import { z } from "zod";

export async function login(
  prev: { message: string },
  form: FormData,
): Promise<{ message: string }> {
  const { data, success } = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .safeParse(Object.fromEntries(form));

  if (!success) {
    return {
      message: "Username or password incorrect!",
    };
  }

  try {
    await auth.api.signInEmail({
      body: data,
    });
  } catch (e: unknown) {
    if (e instanceof APIError && e.body?.message) {
      return {
        message: e.body.message,
      };
    }

    console.log(inspect(e, { depth: null }));
    return {
      message: "An unknown error has occurred! Please try again...",
    };
  }

  redirect("/");
}
