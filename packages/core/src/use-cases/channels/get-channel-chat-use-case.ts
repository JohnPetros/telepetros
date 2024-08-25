import type { ChannelDto, ChatDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository, IChatsRepository } from '#interfaces/repositories'
import { ChannelNotFoundError, ChatNoFoundError } from '../../errors'

type Request = string

type Response = {
  channel: ChannelDto
  chat: ChatDto
}

export class GetChannelChatUseCase implements IUseCase<Request, Response> {
  constructor(
    private readonly channelsRepository: IChannelsRepository,
    private readonly chatsRepository: IChatsRepository,
  ) {}

  async execute(channelId: Request) {
    const channel = await this.channelsRepository.findById(channelId)

    if (!channel) {
      throw new ChannelNotFoundError()
    }

    const chat = await this.chatsRepository.findByChannelChatId(channel.chatId)

    if (!chat) {
      throw new ChatNoFoundError()
    }

    return {
      channel: channel.dto,
      chat: chat.dto,
    }
  }
}
