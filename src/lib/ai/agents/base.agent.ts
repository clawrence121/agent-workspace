import { openai } from "@ai-sdk/openai";
import { LanguageModelV1, Message, streamText, ToolSet } from "ai";

export abstract class BaseAgent {
  model: LanguageModelV1 = openai("gpt-4o");
  maxSteps = 5;

  abstract role: string;
  abstract system: string;
  abstract tools: ToolSet;

  async streamText(messages: Message[]) {
    return streamText({
      model: this.model,
      system: this.system,
      messages,
      tools: this.tools,
      maxSteps: 5,
    }).toDataStreamResponse();
  }
}
