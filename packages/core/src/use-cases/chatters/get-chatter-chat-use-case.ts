import { Chatter } from '#domain/entities'
import type { ChannelDto, ChatDto, ChatterDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChattersRepository, IChatsRepository } from '#interfaces/repositories'
import {
  ChannelNotFoundError,
  ChannelNotPublicError,
  ChatNoFoundError,
  ChatterNotFoundError,
} from '../../errors'

type Request = {
  chatterId: string
  chatterDto: ChatterDto
}

type Response = {
  chatter: ChatterDto
  chat: ChatDto
}

export class GetChatterChatUseCase implements IUseCase<Request, Response> {
  constructor(
    private readonly chattersRepository: IChattersRepository,
    private readonly chatsRepository: IChatsRepository,
  ) {}

  async execute({ chatterId, chatterDto }: Request) {
    const secondChatter = await this.chattersRepository.findById(chatterId)

    if (!secondChatter) {
      throw new ChatterNotFoundError()
    }
    const firstChatter = Chatter.create(chatterDto)

    const chatId = await this.chatsRepository.findIdByChatters(
      firstChatter.id,
      secondChatter.id,
    )

    if (!chatId) {
      throw new ChatNoFoundError()
    }

    const chat = await this.chatsRepository.findById(chatId)

    if (!chat) {
      throw new ChatNoFoundError()
    }

    return {
      chatter: secondChatter.dto,
      chat: chat.dto,
    }
  }
}
