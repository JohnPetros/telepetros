import { MessageNoFoundError } from '#errors'
import type { IUseCase } from '#interfaces/handlers'
import type { IChatsRepository } from '#interfaces/repositories'

type Request = {
  messageId: string
  newText: string
}

export class EditMessageUseCase implements IUseCase<Request, string> {
  constructor(private readonly chatsRepository: IChatsRepository) {}

  async execute({ messageId, newText }: Request): Promise<string> {
    const message = await this.chatsRepository.findMessageById(messageId)

    if (!message) {
      throw new MessageNoFoundError()
    }

    await this.chatsRepository.updateMessageText(messageId, newText)

    return newText
  }
}
