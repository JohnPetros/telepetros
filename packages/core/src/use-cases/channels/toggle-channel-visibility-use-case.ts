import type { ChannelDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository } from '#interfaces/repositories'
import { ChannelNotFoundError, ChannelNotPublicError } from '../../errors'

type Request = {
  chatterId: string
  channelId: string
  isChannelPublic: boolean
}

export class ToggleChannelVisibilityUseCase implements IUseCase<Request, ChannelDto> {
  constructor(private readonly channelsRepository: IChannelsRepository) {}

  async execute({ chatterId, channelId, isChannelPublic }: Request): Promise<ChannelDto> {
    const channel = await this.channelsRepository.findById(channelId)

    if (!channel) {
      throw new ChannelNotFoundError()
    }

    if (channel.ownerId !== chatterId) {
      throw new ChannelNotPublicError()
    }

    await this.channelsRepository.updateVisibility(channel.id, isChannelPublic)

    return channel.dto
  }
}
