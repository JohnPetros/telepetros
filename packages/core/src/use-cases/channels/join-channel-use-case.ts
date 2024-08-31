import { Chatter } from '#domain/entities'
import type { ChannelDto, ChatterDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository, IChatsRepository } from '#interfaces/repositories'
import {
  AlreadyJoinedChannelError,
  ChannelNotFoundError,
  ChannelNotPublicError,
} from '../../errors'

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
    const channel = await this.channelsRepository.findByInviteCode(inviteCode)

    if (!channel) {
      throw new ChannelNotFoundError()
    }

    if (!channel.isPublic) {
      throw new ChannelNotPublicError()
    }

    const chatter = Chatter.create(chatterDto)

    const chat = await this.chatsRepository.findById(channel.chatId)

    if (chat?.hasChatter(chatter)) {
      throw new AlreadyJoinedChannelError()
    }

    await this.chatsRepository.addChatterToChat(chatter.id, channel.chatId)

    return channel.dto
  }
}
