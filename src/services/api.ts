import axios from "axios";
import type { ChatMode } from "../types/chat";

const API_ENDPOINTS: Record<ChatMode, string> = {
  chat: "/api/workouts/chat",
  log: "/api/workouts/log",
};

const DOWNLOAD_ENDPOINT = "/api/workouts/download";
const CLEAR_ENDPOINT = "/api/workouts/clear";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

interface WorkoutResponse {
  data?: {
    message?: string;
    conversationId?: string;
  };
  message?: string;
  conversationId?: string;
}

export interface SendMessageResult {
  message: string;
  conversationId?: string;
}

function parseAssistantMessage(message: string): string {
  return message
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\*\*/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*(assistant|response)\s*:\s*/i, "")
    .trim();
}

export async function sendMessage(
  mode: ChatMode,
  conversationId: string,
  question: string,
): Promise<SendMessageResult> {
  const payload = { conversationId, question };
  const { data } = await apiClient.post<WorkoutResponse | string>(
    API_ENDPOINTS[mode],
    payload,
  );
  if (typeof data === "string") return { message: parseAssistantMessage(data) };

  return {
    message: parseAssistantMessage(
      data.data?.message ??
        data.message ??
        "The workout assistant returned an empty response.",
    ),
    conversationId: data.data?.conversationId ?? data.conversationId,
  };
}

function getFilename(contentDisposition?: string): string {
  const encodedName = contentDisposition?.match(
    /filename\*=UTF-8''([^;]+)/i,
  )?.[1];
  const plainName = contentDisposition?.match(/filename="?([^";]+)"?/i)?.[1];
  const filename = encodedName ? decodeURIComponent(encodedName) : plainName;
  return filename?.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_") || "workout-export";
}

export async function downloadWorkoutFile(): Promise<void> {
  const response = await apiClient.get<Blob>(DOWNLOAD_ENDPOINT, {
    responseType: "blob",
    headers: {
      Accept: "application/octet-stream, application/pdf, text/csv, */*",
    },
  });

  const contentType = String(
    response.headers["content-type"] ?? "application/octet-stream",
  );
  const blob = new Blob([response.data], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getFilename(
    String(response.headers["content-disposition"] ?? ""),
  );
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function clearWorkoutFile(): Promise<void> {
  await apiClient.post(CLEAR_ENDPOINT);
}
