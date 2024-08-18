import type { ChannelDto } from '#dtos'
import type { UseCase } from '#interfaces/handlers'
import type { ChannelsRepository } from '#interfaces/repositories'

export class ListChatterChannelsUseCase implements UseCase<string, ChannelDto[]> {
  constructor(private readonly repository: ChannelsRepository) {}

  async execute(chatterId: string) {
    const channels = await this.repository.findManyByChatterId(chatterId)
    return channels.map((channel) => channel.dto)
  }
}
