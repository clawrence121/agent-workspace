import * as authSchema from "./schema/auth";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/lib/env";

export const db = drizzle(env.DATABASE_URL, {
  schema: {
    ...authSchema,
  },
});
