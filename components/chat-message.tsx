import { cn } from "@/lib/utils";
import { BrainCircuit, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 rounded-lg p-4",
        isBot ? "bg-secondary" : "bg-background"
      )}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background">
        {isBot ? (
          <BrainCircuit className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm text-foreground">{message}</p>
      </div>
    </div>
  );
}