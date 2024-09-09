import { Chatter } from '#domain/entities'
import type { ChannelDto, ChatDto, ChatterDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository, IChatsRepository } from '#interfaces/repositories'
import {
  ChannelNotFoundError,
  ChannelNotPublicError,
  ChatNoFoundError,
} from '../../errors'

type Request = {
  channelId: string
  chatterDto: ChatterDto
}

type Response = {
  channel: ChannelDto
  chat: ChatDto
}

export class GetChannelChatUseCase implements IUseCase<Request, Response> {
  constructor(
    private readonly channelsRepository: IChannelsRepository,
    private readonly chatsRepository: IChatsRepository,
  ) {}

  async execute({ channelId, chatterDto }: Request) {
    const channel = await this.channelsRepository.findById(channelId)

    if (!channel) {
      throw new ChannelNotFoundError()
    }

    const chatter = Chatter.create(chatterDto)

    if (channel.ownerId !== chatter.id && !channel.isPublic) {
      throw new ChannelNotPublicError()
    }

    const chat = await this.chatsRepository.findById(channel.chatId)

    if (!chat) {
      throw new ChatNoFoundError()
    }

    if (!chat.hasChatter(chatter)) {
      throw new ChannelNotPublicError()
    }

    return {
      channel: channel.dto,
      chat: chat.dto,
    }
  }
}
