import { DietAgent } from "@/agents/diet";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const agent = new DietAgent();

  return agent.sendMessage(messages);
}
