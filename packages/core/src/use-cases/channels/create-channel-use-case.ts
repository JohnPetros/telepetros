import { Channel } from '#domain/entities'
import type { UseCase } from '#interfaces/handlers'
import type { ChannelsRepository } from '#interfaces/repositories'
import type { ChannelDto } from '#dtos'

export class CreateChannelUseCase implements UseCase<ChannelDto, void> {
  constructor(private readonly repository: ChannelsRepository) {}

  async execute(dto: ChannelDto) {
    const channel = Channel.create(dto)
    await this.repository.add(channel)
  }
}
