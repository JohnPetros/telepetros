import { Channel } from '@/domain/entities'
import type { ChannelDto } from '@/dtos'
import type { UseCase } from '@/interfaces/handlers'
import type { ChannelsRepository } from '@/interfaces/repositories'

export class CreateChannelUseCase implements UseCase<ChannelDto, void> {
  constructor(private readonly repository: ChannelsRepository) {}

  async execute(channelDto: ChannelDto) {
    const channel = Channel.create(channelDto)

    this.repository.add(channel)
  }
}
