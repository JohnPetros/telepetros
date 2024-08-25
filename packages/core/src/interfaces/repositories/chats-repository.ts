import type { Chat, Message } from '#domain/entities'

export interface IChatsRepository {
  findByChannelChatId(chatId: string): Promise<Chat | null>
  addMessage(message: Message): Promise<Message>
}
