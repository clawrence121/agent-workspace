import { tool } from "ai";
import { z } from "zod";
import { BaseAgent } from "../agents/base.agent";
import { DietAgent } from "../agents/diet.agent";
import { DailyPlannerAgent } from "../agents/daily-planner.agent";

const AGENTS: Record<string, BaseAgent> = {
  diet: new DietAgent(),
  dailyPlanner: new DailyPlannerAgent(),
};

const DESCRIPTION = `Route a specific query or action off to a dedicated agent to handle on your behalf.
Here are your available routing locations:
${Object.entries(AGENTS)
  .map(
    ([key, agent]) =>
      `${key}: ${agent.description}. Available tools: ${Object.keys(agent.tools)}`,
  )
  .join(`\n`)}`;

export const callAgent = tool({
  description: DESCRIPTION,
  parameters: z.object({
    agent: z
      .enum(Object.keys(AGENTS) as [string, ...string[]])
      .describe("The AI agent to route the prompt to for processing."),
    prompt: z
      .string()
      .min(1)
      .describe("The prompt to send to the agent for further processing."),
  }),
  execute: async ({ agent, prompt }) => {
    console.log("Calling agent", agent, prompt);
    return await AGENTS[agent].generateObject(prompt);
  },
});
