import type { Chat, Message } from '#domain/entities'

export interface IChatsRepository {
  findById(chatId: string): Promise<Chat | null>
  findIdByChatters(
    firstChatterId: string,
    secondChatterId: string,
  ): Promise<string | null>
  findMessageById(messageId: string): Promise<Message | null>
  addMessage(message: Message): Promise<Message>
  addChatterToChat(chatterId: string, chatId: string): Promise<void>
  updateMessageText(messageId: string, newText: string): Promise<void>
  addChatterChat(
    firstChatterId: string,
    secondChatterId: string,
    chatId: string,
  ): Promise<void>
  removeMessage(messageId: string): Promise<void>
}
