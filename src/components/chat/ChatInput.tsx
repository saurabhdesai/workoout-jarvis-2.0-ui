import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "../../components/ui/button";

export function ChatInput({
  isLoading,
  onSend,
}: {
  isLoading: boolean;
  onSend: (message: string) => void;
}) {
  const [value, setValue] = useState("");
  const submit = () => {
    const message = value.trim();
    if (!message || isLoading) return;
    onSend(message);
    setValue("");
  };
  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0);
  return (
    <div className="shrink-0 border-t border-[#e4ebe4] bg-[#fbfcfb] px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 sm:px-8 sm:pb-5 sm:pt-4">
      <div className="mx-auto flex max-w-2xl items-end gap-2 rounded-2xl border border-[#dfe8df] bg-white p-1.5 pl-3 shadow-[0_4px_18px_rgba(41,74,48,0.06)] focus-within:border-[#9fc0a3] focus-within:ring-2 focus-within:ring-[#e4efe5] sm:gap-3 sm:p-2 sm:pl-4">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey && !isTouchDevice()) {
              event.preventDefault();
              submit();
            }
          }}
          placeholder="Ask about your workout..."
          enterKeyHint="enter"
          rows={1}
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2 text-[14px] leading-5 text-[#304137] outline-none placeholder:text-[#a1aea5] sm:text-sm"
        />
        <Button
          aria-label="Send message"
          disabled={!value.trim() || isLoading}
          onClick={submit}
          className="size-10 shrink-0 rounded-xl bg-[#3d7149] p-0 hover:bg-[#315e3b] disabled:bg-[#dce6dd] sm:size-10"
        >
          <ArrowUp className="size-4" />
        </Button>
      </div>
      <p className="mx-auto mt-2 max-w-2xl text-center text-[11px] text-[#a0aaa2]">
        <span className="hidden sm:inline">Enter to send · Shift + Enter for a new line</span>
        <span className="sm:hidden">Enter for a new line · Use Send to submit</span>
      </p>
    </div>
  );
}
