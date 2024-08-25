import type { Chat, Message } from '#domain/entities'

export interface IChatsRepository {
  findByChannelChatId(chatId: string): Promise<Chat>
  addMessage(message: Message): Promise<Message>
}
