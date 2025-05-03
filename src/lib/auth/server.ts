import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()], // nextCookies needs to be last
});

export async function getRSCSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function getRequestSession(req: Request) {
  return await auth.api.getSession({
    headers: req.headers,
  });
}
