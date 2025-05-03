import { BaseAgent } from "./base.agent";
import { createPerplexity } from "@ai-sdk/perplexity";
import { LanguageModelV1 } from "ai";

const openrouter = createPerplexity({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export class WebSearchAgent extends BaseAgent {
  override model = openrouter("perplexity/sonar-pro:online") as LanguageModelV1;

  role =
    "You are an expert at answering all generic user queries and are able to search the web for more detailed information.";
  system = this.role;
  tools = {};
}
