import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()], // nextCookies needs to be last
});

export async function getSessionFromHeaders() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
