import type { Chat, Message } from '#domain/entities'

export interface IChatsRepository {
  findById(chatId: string): Promise<Chat | null>
  addMessage(message: Message): Promise<Message>
}
