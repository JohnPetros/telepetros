import { ChannelNotFoundError } from '#errors'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository } from '#interfaces/repositories'

export class DeleteChannelUseCase implements IUseCase<string> {
  constructor(private readonly channelsRepository: IChannelsRepository) {}

  async execute(channelId: string): Promise<void> {
    const channel = await this.channelsRepository.findByInviteCode(channelId)

    if (!channel) {
      throw new ChannelNotFoundError()
    }

    await this.channelsRepository.remove(channelId)
  }
}
