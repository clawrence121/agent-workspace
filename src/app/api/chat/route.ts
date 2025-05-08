import { callAgent } from "@/lib/ai/tools/call-agent.tool";
import { webSearch } from "@/lib/ai/tools/web-search.tool";
import * as TaskTools from "@/lib/ai/tools/tasks.tool";
import { getRequestSession } from "@/lib/auth/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await getRequestSession(req);

  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized!",
      },
      {
        status: 403,
      },
    );
  }

  const { messages } = await req.json();

  try {
    return streamText({
      model: openai("gpt-4o"),
      system: `You are an advanced executive assistant called Dave that manages a team of agents for ${session.user.name}. When you receive a response from an agent call, always process it and reply with a written response to the user. The users ID is ${session.user.id}. Todays date is ${new Date().toISOString()}`,
      messages,
      tools: {
        callAgent,
        webSearch,
        ...TaskTools,
      },
      maxSteps: 10,
    }).toDataStreamResponse();
  } catch (e) {
    console.error(e);
    throw e;
  }
}
