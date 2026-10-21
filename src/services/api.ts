import axios from 'axios'
import type { ChatMode } from '../types/chat'

const API_ENDPOINTS: Record<ChatMode, string> = {
  chat: '/api/workouts/chat',
  log: '/api/workouts/log',
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
})

interface WorkoutResponse {
  data?: {
    message?: string
    conversationId?: string
  }
  message?: string
  conversationId?: string
}

export interface SendMessageResult {
  message: string
  conversationId?: string
}

function parseAssistantMessage(message: string): string {
  return message
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\*\*/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*(assistant|response)\s*:\s*/i, '')
    .trim()
}

export async function sendMessage(mode: ChatMode, conversationId: string, question: string): Promise<SendMessageResult> {
  const payload = { conversationId, question }
  const { data } = await apiClient.post<WorkoutResponse | string>(API_ENDPOINTS[mode], payload)
  if (typeof data === 'string') return { message: parseAssistantMessage(data) }

  return {
    message: parseAssistantMessage(data.data?.message ?? data.message ?? 'The workout assistant returned an empty response.'),
    conversationId: data.data?.conversationId ?? data.conversationId,
  }
}
