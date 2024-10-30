import { ChannelNotFoundError, ChatNoFoundError, ChatterNotFoundError } from '#errors'
import type { IUseCase } from '#interfaces/handlers'
import type {
  IChannelsRepository,
  IChatsRepository,
  IChattersRepository,
} from '#interfaces/repositories'

type Request = {
  channelId: string
  chatterId: string
}

export class LeaveChannelUseCase implements IUseCase<Request> {
  constructor(
    private readonly channelsRepository: IChannelsRepository,
    private readonly chattersRepository: IChattersRepository,
    private readonly chatsRepository: IChatsRepository,
  ) {}

  async execute({ channelId, chatterId }: Request): Promise<void> {
    const chatter = await this.chattersRepository.findById(chatterId)

    if (!chatter) {
      throw new ChatterNotFoundError()
    }

    const channel = await this.channelsRepository.findByInviteCode(channelId)

    if (!channel) {
      throw new ChannelNotFoundError()
    }

    const channelChat = await this.chatsRepository.findById(channel.chatId)

    if (!channelChat) {
      throw new ChatNoFoundError()
    }

    if (channel.isOwner(chatter)) {
      const newOwner = channelChat.getNextChatter(chatter.id)
      if (newOwner) await this.channelsRepository.updateOwner(channel.id, newOwner.id)
    }

    await this.chatsRepository.removeChatterChat(chatterId, channel.chatId)
  }
}
