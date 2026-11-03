import { Download, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { ConfirmAlertDialog } from "../common/ConfirmAlertDialog";
import { ModeSelector } from "./ModeSelector";
import type { ChatMode } from "../../types/chat";
export function AppHeader({
  mode,
  onModeChange,
  onNew,
  onDownload,
  onClear,
}: {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  onNew: () => void;
  onDownload: () => Promise<void>;
  onClear: () => Promise<void>;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownload();
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e4ebe4] px-4 sm:h-[72px] sm:px-8">
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-[#dcecdf] text-[#477451] sm:size-9 sm:rounded-xl">
          <span className="text-base sm:text-lg">✦</span>
        </div>
        <div>
          <h1 className="truncate text-[14px] font-semibold tracking-[-0.01em] text-[#24382a] sm:text-[15px]">
            Workout Tracker
          </h1>
          <p className="hidden text-[11px] text-[#84938a] xs:block sm:block">Your training companion</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <ModeSelector value={mode} onChange={onModeChange} />
        <Button
          aria-label="Download workout file"
          title="Download workout file"
          disabled={isDownloading}
          onClick={handleDownload}
          variant="outline"
          className="size-10 rounded-xl border-[#dbe5dc] bg-white p-0 text-[#477451] hover:bg-[#f0f6f1] sm:h-9 sm:w-auto sm:px-3"
        >
          <Download className="size-4" />
          <span className="hidden sm:inline">Download</span>
        </Button>
        <ConfirmAlertDialog
          onConfirm={onClear}
          title="Clear workout file?"
          message="Are you sure? Once deleted it cannot be reverted."
          confirmText="Clear file"
          trigger={
            <Button
              aria-label="Clear workout file"
              title="Clear workout file"
              variant="outline"
              className="size-10 rounded-xl border-[#efd5d2] bg-white p-0 text-[#b14e47] hover:bg-[#fff4f2] hover:text-[#963d37] sm:h-9 sm:w-auto sm:px-3"
            >
              <Trash2 className="size-4" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          }
        />
        <Button
          onClick={onNew}
          className="size-10 gap-1.5 rounded-xl bg-[#3d7149] p-0 text-sm shadow-sm hover:bg-[#315e3b] sm:h-9 sm:w-auto sm:px-3.5"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">New</span>
        </Button>
      </div>
    </header>
  );
}
