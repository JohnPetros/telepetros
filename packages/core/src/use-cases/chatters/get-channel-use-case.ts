import type { ChannelDto } from '#dtos'
import { ChannelNotFoundError, ChannelNotPublicError } from '#errors'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository } from '#interfaces/repositories'

type Request = {
  channelId: string
  chatterId: string
}

export class GetChannelUseCase implements IUseCase<Request, ChannelDto> {
  constructor(private readonly channelsRepository: IChannelsRepository) {}

  async execute({ channelId, chatterId }: Request): Promise<ChannelDto> {
    const channel = await this.channelsRepository.findById(channelId)

    if (!channel) {
      throw new ChannelNotFoundError()
    }

    if (channel.ownerId !== chatterId && !channel.isPublic) {
      throw new ChannelNotPublicError()
    }

    return channel.dto
  }
}
