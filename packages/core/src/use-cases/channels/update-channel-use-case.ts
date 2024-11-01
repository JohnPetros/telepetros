import { Chatter } from '#domain/entities'
import type { ChannelDto, ChatterDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository } from '#interfaces/repositories'
import { ChannelNotFoundError, ChannelNotPublicError } from '../../errors'

type Request = {
  channelDto: Partial<ChannelDto>
  chatterDto: ChatterDto
  channelId: string
}

export class UpdateChannelUseCase implements IUseCase<Request> {
  constructor(private readonly channelsRepository: IChannelsRepository) {}

  async execute({ channelId, channelDto, chatterDto }: Request): Promise<void> {
    const channel = await this.channelsRepository.findById(channelId)

    if (!channel) {
      throw new ChannelNotFoundError()
    }

    const chatter = Chatter.create(chatterDto)

    if (!channel.isOwner(chatter)) {
      throw new ChannelNotPublicError()
    }

    const updatedChannel = channel.update(channelDto)

    await this.channelsRepository.update(chatter.id, updatedChannel)
  }
}
