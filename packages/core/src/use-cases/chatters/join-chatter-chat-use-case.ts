import { Chat, Chatter } from '#domain/entities'
import type { ChatterDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChatsRepository, IChattersRepository } from '#interfaces/repositories'
import { ChatterNotFoundError } from '../../errors'

type Request = {
  firstChatterDto: ChatterDto
  secondChatterId: string
}

export class JoinChatterChatUseCase implements IUseCase<Request, ChatterDto> {
  constructor(
    private readonly chattersRepository: IChattersRepository,
    private readonly chatsRepository: IChatsRepository,
  ) {}

  async execute({ firstChatterDto, secondChatterId }: Request): Promise<ChatterDto> {
    const firstChatter = Chatter.create(firstChatterDto)
    const secondChatter = await this.chattersRepository.findById(secondChatterId)

    if (!secondChatter) {
      throw new ChatterNotFoundError()
    }

    const existingChatId = await this.chatsRepository.findIdByChatters(
      firstChatter.id,
      secondChatter.id,
    )

    if (!existingChatId) {
      const chat = Chat.create()
      await this.chatsRepository.addChatterChat(
        firstChatter.id,
        secondChatter.id,
        chat.id,
      )
    }

    return secondChatter.dto
  }
}
