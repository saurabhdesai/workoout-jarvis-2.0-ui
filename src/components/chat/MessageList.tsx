import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import type { ChatMessage } from "../../types/chat";
export function MessageList({
  messages,
  isLoading,
}: {
  messages: ChatMessage[];
  isLoading: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
  return (
    <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-8 sm:py-8">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3.5 sm:gap-4">
        <div className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#9aa89e] sm:mb-4 sm:text-[11px]">
          Today
        </div>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-[#e3ebe3] bg-white px-4 py-3 shadow-sm">
              <div className="flex gap-1.5">
                <span className="size-1.5 animate-bounce rounded-full bg-[#8ba491] [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-[#8ba491] [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-[#8ba491]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
