import { tool, ToolSet } from "ai";
import { BaseAgent } from "./base.agent";
import { z } from "zod";

const Todo = z.object({
  isDone: z.boolean().default(false).describe("Has the item been completed?"),
  description: z
    .string()
    .min(1)
    .max(150)
    .describe("The todo that needs to be completed"),
});
type Todo = z.infer<typeof Todo>;

const IN_MEM_TODOS: Todo[] = [];

export class DailyPlannerAgent extends BaseAgent {
  description: string =
    "The DailyPlannerAgent works to build a todo list for the user based off of items they have asked to save for later.";

  system: string =
    "You are Jane, a expert daily planner that works for Dave as part of the executive team. Your job is to analyse tasks that have been passed to you, order, and schedule them so the team can pick them up in the best order.";

  tools: ToolSet = {
    getTodos: tool({
      description: "Get all todos for the team",
      parameters: z.object({}),
      execute: async () => IN_MEM_TODOS,
    }),
    addTodo: tool({
      description: "Add a todo to the list and returns all todos",
      parameters: Todo,
      execute: async (todo) => IN_MEM_TODOS.push(todo),
    }),
  };
}
