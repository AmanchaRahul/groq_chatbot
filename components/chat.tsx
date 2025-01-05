"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/chat-message";
import { Send } from "lucide-react";
import { getGroqResponse } from "@/lib/groq";

interface Message {
  content: string;
  isBot: boolean;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your AI assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { content: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await getGroqResponse(userMessage);
      setMessages((prev) => [...prev, { content: response, isBot: true }]);
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages((prev) => [
        ...prev,
        {
          content: "Sorry, I encountered an error. Please try again.",
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.content}
            isBot={message.isBot}
          />
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="border-t bg-background p-4 flex gap-2"
      >
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}