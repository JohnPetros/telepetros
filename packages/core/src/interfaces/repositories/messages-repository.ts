import type { Message } from '#domain/entities'

export interface IMessagesRepository {
    findManyByChatId(chatId: string): Promise<Message[] | null>
}
