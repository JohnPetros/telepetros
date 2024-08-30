import { Chatter } from '#domain/entities'
import type { ChannelDto, ChatterDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository, IChatsRepository } from '#interfaces/repositories'
import { ChannelNotFoundError, ChannelNotPublicError } from '../../errors'

type Request = {
  chatterDto: ChatterDto
  inviteCode: string
}

export class JoinChannelUseCase implements IUseCase<Request, ChannelDto> {
  constructor(
    private readonly channelsRepository: IChannelsRepository,
    private readonly chatsRepository: IChatsRepository,
  ) {}

  async execute({ inviteCode, chatterDto }: Request): Promise<ChannelDto> {
    const chatter = Chatter.create(chatterDto)
    const channel = await this.channelsRepository.findByInviteCode(inviteCode)

    if (!channel) {
      throw new ChannelNotFoundError()
    }

    if (!channel.isPublic) {
      throw new ChannelNotPublicError()
    }

    await this.chatsRepository.addChatterChat(chatter.id, channel.chatId)

    return channel.dto
  }
}
