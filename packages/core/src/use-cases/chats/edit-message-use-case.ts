import { MessageNoFoundError } from '#errors'
import type { IUseCase } from '#interfaces/handlers'
import type { IChatsRepository } from '#interfaces/repositories'

type Request = {
  messageId: string
  newText: string
}

export class EditMessageUseCase implements IUseCase<Request, void> {
  constructor(private readonly chatsRepository: IChatsRepository) {}

  async execute({ messageId, newText }: Request): Promise<void> {
    const message = await this.chatsRepository.findMessageById(messageId)

    if (!message) {
      throw new MessageNoFoundError()
    }

    await this.chatsRepository.updateMessageText(messageId, newText)
  }
}
