import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import type { ChatMessage } from "../../types/chat";

export function ChatWindow({
  messages,
  isLoading,
  onSend,
}: {
  messages: ChatMessage[];
  isLoading: boolean;
  onSend: (message: string) => void;
}) {
  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput isLoading={isLoading} onSend={onSend} />
    </section>
  );
}
