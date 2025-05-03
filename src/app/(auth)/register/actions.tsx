"use server";

import { auth } from "@/lib/auth/server";
import { APIError } from "better-call";
import { redirect } from "next/navigation";
import { inspect } from "util";
import { z } from "zod";

export async function register(
  prev: { message: string },
  form: FormData,
): Promise<{ message: string }> {
  const { data, success } = z
    .object({
      name: z.string(),
      email: z.enum(["c.lawrence121@live.com"]),
      password: z.string(),
    })
    .safeParse(Object.fromEntries(form));

  if (!success) {
    return {
      message: "Please enter all required fields.",
    };
  }

  try {
    await auth.api.signUpEmail({
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
