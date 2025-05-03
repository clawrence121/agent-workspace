import { CoreMessage } from "ai";

export interface Agent {
  role: string;
  sendMessage: (messages: CoreMessage[]) => void;
}
