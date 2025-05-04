import { openai } from "@ai-sdk/openai";
import {
  generateObject,
  generateText,
  LanguageModelV1,
  Message,
  streamText,
  ToolSet,
} from "ai";

export abstract class BaseAgent {
  model: LanguageModelV1 = openai("gpt-4o");
  maxSteps = 5;

  abstract description: string;
  abstract system: string;
  abstract tools: ToolSet;

  async streamText(messages: Message[]) {
    return streamText({
      model: this.model,
      system: this.system,
      messages,
      tools: this.tools,
      maxSteps: this.maxSteps,
    }).toDataStreamResponse();
  }

  async generateObject(prompt: string) {
    const { text } = await generateText({
      model: this.model,
      system: this.system,
      prompt,
      tools: this.tools,
      maxSteps: this.maxSteps,
    });
    const { object } = await generateObject({
      output: "no-schema",
      system: this.system,
      model: this.model,
      prompt: `Summarise the following text response to JSON for processing by an AI LLM: ${text}`,
    });
    return object;
  }
}
