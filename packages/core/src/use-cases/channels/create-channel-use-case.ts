import { Channel } from '#domain/entities'
import type { ChannelDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository, IChattersRepository } from '#interfaces/repositories'
import { ChatterNotFoundError } from '../../errors'

export class CreateChannelUseCase implements IUseCase<ChannelDto, ChannelDto> {
  constructor(
    private readonly channelsRepository: IChannelsRepository,
    private readonly chattersRepository: IChattersRepository,
  ) {}

  async execute(channelDto: ChannelDto) {
    const channel = Channel.create(channelDto)

    const hasChatter = await this.chattersRepository.findById(channel.ownerId)

    if (!hasChatter) throw new ChatterNotFoundError()

    const addedChatter = await this.channelsRepository.add(channel)
    return addedChatter.dto
  }
}
