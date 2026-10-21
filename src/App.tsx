import { useState } from "react";
import { AppHeader } from "./components/header/AppHeader";
import { ChatWindow } from "./components/chat/ChatWindow";
import { sendMessage } from "./services/api";
import type { ChatMessage, ChatMode } from "./types/chat";
import "./App.css";

const createWelcomeMessage = (): ChatMessage => ({
  id: crypto.randomUUID(),
  role: "assistant",
  content:
    "Hi! I’m your workout companion. Tell me what you trained today, or ask for help planning your next session.",
  createdAt: new Date().toISOString(),
});
function App() {
  const [mode, setMode] = useState<ChatMode>("chat");
  const [conversationId, setConversationId] = useState<string>(() =>
    crypto.randomUUID(),
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    createWelcomeMessage(),
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const handleNewConversation = () => {
    setConversationId(crypto.randomUUID());
    setMessages([createWelcomeMessage()]);
    setIsLoading(false);
  };
  const handleModeChange = (nextMode: ChatMode) => {
    setMode(nextMode);
    setConversationId(crypto.randomUUID());
    setMessages([createWelcomeMessage()]);
    setIsLoading(false);
  };
  const handleSend = async (content: string) => {
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      },
    ]);
    setIsLoading(true);
    try {
      const response = await sendMessage(mode, conversationId, content);
      if (response.conversationId) setConversationId(response.conversationId);
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.message,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-dvh bg-[#fbfcfb] text-[#17231c] sm:bg-[#f5f7f4]">
      <div className="mx-auto flex h-dvh w-full flex-col bg-[#fbfcfb] sm:h-screen sm:max-w-5xl sm:border-x sm:border-[#dfe7df] sm:shadow-[0_0_60px_rgba(35,57,42,0.06)]">
        <AppHeader
          mode={mode}
          onModeChange={handleModeChange}
          onNew={handleNewConversation}
        />
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSend={handleSend}
        />
      </div>
    </main>
  );
}

export default App;
