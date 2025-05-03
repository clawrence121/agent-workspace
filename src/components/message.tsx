import { UIMessage } from "ai";
import { Avatar } from "./ui/avatar";
import AIAvatar from "./ai-avatar";
import UserAvatar from "./user-avatar";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

function Message({ message }: { message: UIMessage }) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[80%] ${
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Avatar
          className={`h-8 w-8 ${
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          {message.role === "user" ? <UserAvatar /> : <AIAvatar />}
        </Avatar>
        <div
          className={`rounded-lg px-4 py-2 shadow-sm ${
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          <div className="whitespace-pre-wrap">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
          {message.experimental_attachments
            ?.filter((attachment) =>
              attachment?.contentType?.startsWith("image/"),
            )
            .map((attachment, index) => (
              <div key={`${message.id}-${index}`} className="mt-2">
                <Image
                  src={attachment.url}
                  width={300}
                  height={300}
                  alt={attachment.name ?? `recipe-image-${index}`}
                  className="rounded-md"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Message;
