import { Loader2 } from "lucide-react";
import AIAvatar from "./ai-avatar";
import { Avatar } from "./ui/avatar";

function AIThinking() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-3 max-w-[80%]">
        <Avatar className="h-8 w-8 bg-muted">
          <AIAvatar />
        </Avatar>
        <div className="rounded-lg px-4 py-2 bg-muted shadow-sm flex items-center">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="ml-2 text-sm">Thinking...</span>
        </div>
      </div>
    </div>
  );
}

export default AIThinking;
