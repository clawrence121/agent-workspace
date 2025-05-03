import { DietAgent } from "@/agents/diet";
import { getRequestSession } from "@/lib/auth/server";
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
  return new DietAgent().sendMessage(messages);
}
