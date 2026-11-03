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
    <header className="flex shrink-0 flex-col gap-3 border-b border-[#e4ebe4] px-4 py-3 sm:h-[72px] sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-0">
      <div className="flex min-w-0 items-center justify-between gap-2.5 sm:justify-start sm:gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-[#dcecdf] text-[#477451] sm:size-9 sm:rounded-xl">
          <span className="text-base sm:text-lg">✦</span>
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-[14px] font-semibold tracking-[-0.01em] text-[#24382a] sm:text-[15px]">
            Workout Tracker
          </h1>
          <p className="hidden text-[11px] text-[#84938a] xs:block sm:block">Your training companion</p>
        </div>
        <Button
          onClick={onNew}
          className="h-10 gap-1.5 rounded-xl bg-[#3d7149] px-3.5 text-sm shadow-sm hover:bg-[#315e3b] sm:hidden"
        >
          <Plus className="size-4" />
          New
        </Button>
      </div>
      <div className="flex w-full shrink-0 items-center gap-1.5 sm:w-auto sm:gap-2">
        <ModeSelector value={mode} onChange={onModeChange} className="min-w-0 flex-1 sm:flex-none" />
        <Button
          aria-label="Download workout file"
          title="Download workout file"
          disabled={isDownloading}
          onClick={handleDownload}
          variant="outline"
          className="size-10 shrink-0 rounded-xl border-[#dbe5dc] bg-white p-0 text-[#477451] hover:bg-[#f0f6f1] sm:h-9 sm:w-auto sm:px-3"
        >
          <Download className="size-4" />
          <span className="hidden sm:inline">Download</span>
        </Button>
        <div>
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
                className="size-10 shrink-0 rounded-xl border-[#efd5d2] bg-white p-0 text-[#b14e47] hover:bg-[#fff4f2] hover:text-[#963d37] sm:h-9 sm:w-auto sm:px-3"
              >
                <Trash2 className="size-4" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            }
          />
        </div>
        <Button
          onClick={onNew}
          className="hidden size-10 gap-1.5 rounded-xl bg-[#3d7149] p-0 text-sm shadow-sm hover:bg-[#315e3b] sm:inline-flex sm:h-9 sm:w-auto sm:px-3.5"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">New</span>
        </Button>
      </div>
    </header>
  );
}
