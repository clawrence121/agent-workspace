import { generateObject, Message } from "ai";
import { DietAgent } from "./agents/diet.agent";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { BaseAgent } from "./agents/base.agent";
import { WebSearchAgent } from "./agents/web-search.agent";

const AGENTS: Record<string, BaseAgent> = {
  diet: new DietAgent(),
  search: new WebSearchAgent(),
};

export async function routeCall(messages: Message[]) {
  console.log(SYSTEM_PROMPT);
  const res = await generateObject({
    model: openai("gpt-4o"),
    system: SYSTEM_PROMPT,
    messages,
    schema: z.object({
      agent: z
        .enum(Object.keys(AGENTS) as [string, ...string[]])
        .describe("The AI agent to route the message call to for processing."),
    }),
  });

  console.log("LLM call routed", res.object);

  return AGENTS[res.object.agent];
}

const SYSTEM_PROMPT = `
You are a dedicated call router.
You are an expert at understanding human intent behind their messages, and forwarding them to the best location to have their neededs met.

To route the calls, here are your available routing locations:
${Object.entries(AGENTS)
  .map(([key, agent]) => `${key}: ${agent.role}`)
  .join(`\n`)}`;
