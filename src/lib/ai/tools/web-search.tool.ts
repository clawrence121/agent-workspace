import { tool } from "ai";
import { z } from "zod";
import { tavily } from "@tavily/core";
import { env } from "@/lib/env";

const tvly = tavily({ apiKey: env.TAVILY_API_KEY });

export const webSearch = tool({
  description:
    "Search the web for specific information about a topic or question that you might have.",
  parameters: z.object({
    query: z
      .string()
      .max(400)
      .describe(
        "The query to search the web for. Max 400 chars. It is better to do multiple small queries for specific information rather than one big query.",
      ),
    // descriptions pulled from docs https://docs.tavily.com/documentation/api-reference/endpoint/search
    searchDepth: z
      .enum(["basic", "advanced"])
      .describe(
        "The depth of the search. advanced search is tailored to retrieve the most relevant sources and content snippets for your query, while basic search provides generic content snippets from each source.",
      ),
    topic: z
      .enum(["general", "news"])
      .describe(
        "The category of the search.news is useful for retrieving real-time updates, particularly about politics, sports, and major current events covered by mainstream media sources. general is for broader, more general-purpose searches that may include a wide range of sources.",
      ),
    days: z
      .number()
      .optional()
      .describe(
        "Number of days back from the current date to include. Available only if topic is news. Default is 7.",
      ),
  }),
  execute: async ({ query, ...options }) => {
    return await tvly.search(query, options);
  },
});
