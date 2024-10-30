import type { ChatterDto } from '#dtos'
import { ChannelNotFoundError } from '#errors'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository, IChattersRepository } from '#interfaces/repositories'

export class ListChannelMembersUseCase implements IUseCase<string, ChatterDto[]> {
  constructor(
    private readonly channelsRepository: IChannelsRepository,
    private readonly chattersRepository: IChattersRepository,
  ) {}

  async execute(channelId: string) {
    const channel = await this.channelsRepository.findById(channelId)

    if (!channel) {
      throw new ChannelNotFoundError()
    }

    const members = await this.chattersRepository.findManyByChatterId(channel.chatId)

    return members.map((member) => member.dto)
  }
}
