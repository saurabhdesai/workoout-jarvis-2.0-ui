import type { ChatMessage } from "../../types/chat";
export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[14px] leading-[1.45rem] shadow-sm sm:max-w-[68%] sm:px-4 sm:py-3 sm:leading-6 ${isUser ? "rounded-br-md bg-[#3d7149] text-white" : "rounded-bl-md border border-[#e3ebe3] bg-white text-[#39483e]"}`}
      >
        {message.content}
      </div>
    </div>
  );
}
