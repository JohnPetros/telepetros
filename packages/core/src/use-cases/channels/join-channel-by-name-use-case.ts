import { Chatter } from '#domain/entities'
import type { ChatterDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository, IChatsRepository } from '#interfaces/repositories'
import { ChannelNotFoundError, ChannelNotPublicError } from '../../errors'

type Request = {
  chatterDto: ChatterDto
  channelName: string
}

export class JoinChannelByNameUseCase implements IUseCase<Request> {
  constructor(
    private readonly channelsRepository: IChannelsRepository,
    private readonly chatsRepository: IChatsRepository,
  ) {}

  async execute({ channelName, chatterDto }: Request): Promise<void> {
    const chatter = Chatter.create(chatterDto)
    const channel = await this.channelsRepository.findByName(channelName)

    if (!channel) {
      throw new ChannelNotFoundError()
    }

    if (!channel.isPublic) {
      throw new ChannelNotPublicError()
    }

    await this.chatsRepository.addChatterChat(chatter.id, channel.chatId)
  }
}
