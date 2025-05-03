import Chat from "./chat/chat";

export default async function AgentsDietPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <Chat />
    </div>
  );
}
