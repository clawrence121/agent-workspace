import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import "dotenv/config";

export const env = createEnv({
  server: {
    // App config
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url(),
    DATABASE_URL: z.string().min(1),

    // AI keys
    ANTHROPIC_API_KEY: z.string().startsWith("sk-ant"),
    OPEN_ROUTER_API_KEY: z.string().startsWith("sk-or"),
    OPENAI_API_KEY: z.string().startsWith("sk-proj"),
    TAVILY_API_KEY: z.string().startsWith("tvly"),
  },
  client: {
    // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
});
