import { Message } from '#domain/entities'
import type { MessageDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChatsRepository } from '#interfaces/repositories'

export class SendMessageUseCase implements IUseCase<MessageDto, MessageDto> {
  constructor(private readonly chatsRepository: IChatsRepository) {}

  async execute(dto: MessageDto) {
    const message = Message.create(dto)
    const messages = await this.chatsRepository.addMessage(message)

    return messages.dto
  }
}
