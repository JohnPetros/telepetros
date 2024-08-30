import { Channel, Chat } from '#domain/entities'
import type { ChannelDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository, IChattersRepository } from '#interfaces/repositories'
import { ChatterNotFoundError } from '../../errors'

type Request = {
  name: string
  avatar: string
  ownerId: string
  hash: string
}

export class CreateChannelUseCase implements IUseCase<Request, ChannelDto> {
  constructor(
    private readonly channelsRepository: IChannelsRepository,
    private readonly chattersRepository: IChattersRepository,
  ) {}

  async execute({ name, hash, avatar, ownerId }: Request) {
    const chat = Chat.create()
    const channel = Channel.create({
      inviteCode: hash,
      name,
      ownerId,
      avatar,
      chatId: chat.id,
    })

    const hasChatter = await this.chattersRepository.findById(channel.ownerId)

    if (!hasChatter) throw new ChatterNotFoundError()

    const addedChannel = await this.channelsRepository.add(channel)
    return addedChannel.dto
  }
}
