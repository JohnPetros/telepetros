import { MessageNoFoundError } from '#errors'
import type { IUseCase } from '#interfaces/handlers'
import type { IFileStorageProvider } from '#interfaces/providers'
import type { IChatsRepository } from '#interfaces/repositories'

export class DeleteMessageUseCase implements IUseCase<string, string> {
  constructor(
    private readonly chatsRepository: IChatsRepository,
    private readonly fileStorageProvider: IFileStorageProvider,
  ) {}

  async execute(messageId: string): Promise<string> {
    const message = await this.chatsRepository.findMessageById(messageId)

    if (!message) {
      throw new MessageNoFoundError()
    }

    await this.chatsRepository.removeMessage(messageId)

    if (message.attachment) {
      await this.fileStorageProvider.remove(message.attachment.fileId)
    }

    return messageId
  }
}
