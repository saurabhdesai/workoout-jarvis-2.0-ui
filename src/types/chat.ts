export type MessageRole = 'user' | 'assistant'
export type ChatMode = 'chat' | 'log'
export interface ChatMessage { id: string; role: MessageRole; content: string; createdAt: string }
