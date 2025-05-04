"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload } from "lucide-react";
import Message from "@/components/message";
import AIThinking from "@/components/ai-thinking";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    sendExtraMessageFields: true,
    onFinish(message, options) {
      console.log(message, options);
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      // Check if user is already near the bottom
      const isAtBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        100;

      // Only auto-scroll if we're already near the bottom
      if (isAtBottom) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  if (!mounted) return null;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmit(event, {
      experimental_attachments: files,
    });

    setFiles(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Fixed Header */}
      <div className="px-6 py-4 border-b sticky top-0 bg-background z-10">
        <h1 className="text-2xl font-bold">Your Assistant</h1>
        {/* <p className="text-muted-foreground">Start a new chat</p> */}
      </div>

      {/* Scrollable Message Area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4 pb-4 max-w-5xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              <p className="text-lg font-medium">
                Hey! I&apos;m your agentic assistant, what can I help you with
                today?
              </p>
              <p className="text-sm mt-2">
                I will route your questions to the best agents to assist with
                your query
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          )}
          {status == "submitted" && <AIThinking />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="p-4 border-t sticky bottom-0 z-10">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={onSubmit} className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="How can I help?"
                className="flex-1"
                disabled={status !== "ready"}
              />
              <Button
                type="submit"
                disabled={status !== "ready" || (!input.trim() && !files)}
              >
                {status !== "ready" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) {
                    setFiles(event.target.files);
                  }
                }}
                ref={fileInputRef}
              />

              {files && files.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  {Array.from(files)
                    .map((file) => file.name)
                    .join(", ")}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
