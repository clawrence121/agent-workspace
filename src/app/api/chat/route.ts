import { DietAgent } from "@/agents/diet";
import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const agent = new DietAgent();

  return agent.sendMessage(messages);

  // const result = streamText({
  //   model: anthropic("claude-3-7-sonnet-20250219"),
  //   messages,
  // });

  // return result.toDataStreamResponse();
}
