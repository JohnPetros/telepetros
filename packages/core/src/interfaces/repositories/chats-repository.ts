import type { Chat, Message } from '#domain/entities'

export interface IChatsRepository {
  findById(chatId: string): Promise<Chat | null>
  findIdByChatters(
    firstChatterId: string,
    secondChatterId: string,
  ): Promise<string | null>
  addMessage(message: Message): Promise<Message>
  addChatterToChat(chatterId: string, chatId: string): Promise<void>
  addChatterChat(firstChatterId: string, secondChatterId: string, chatId: string): Promise<void>
}
