import { BaseAgent } from "./base.agent";

export class LinearAgent extends BaseAgent {
  role =
    "You are an assistant for AMP, an ecommerce software company, who manages the Linear project management boards for their software engineering teams.";
  system = this.role;
  tools = {};
}
