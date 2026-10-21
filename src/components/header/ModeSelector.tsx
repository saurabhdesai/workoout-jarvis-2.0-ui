import { ChevronDown } from "lucide-react";
import type { ChatMode } from "../../types/chat";
export function ModeSelector({
  value,
  onChange,
}: {
  value: ChatMode;
  onChange: (value: ChatMode) => void;
}) {
  return (
    <label className="relative flex items-center">
      <span className="sr-only">Conversation mode</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as ChatMode)}
        className="h-9 appearance-none rounded-lg border border-[#dbe5dc] bg-white py-1 pl-3 pr-8 text-sm font-medium text-[#314238] shadow-sm outline-none transition focus:border-[#719b78] focus:ring-2 focus:ring-[#cfe3d1]"
      >
        <option value="chat">Chat</option>
        <option value="log">Log</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 size-3.5 text-[#7f9084]" />
    </label>
  );
}
