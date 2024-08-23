import { Channel, Chat, Chatter } from '#domain/entities'
import type { ChannelDto } from '#dtos'
import type { IUseCase } from '#interfaces/handlers'
import type { IChannelsRepository, IChattersRepository } from '#interfaces/repositories'
import { ChatterNotFoundError } from '../../errors'

type Request = {
  name: string
  ownerId: string
  hash: string
}

export class CreateChannelUseCase implements IUseCase<Request, ChannelDto> {
  constructor(
    private readonly channelsRepository: IChannelsRepository,
    private readonly chattersRepository: IChattersRepository,
  ) {}

  async execute({ name, hash, ownerId }: Request) {
    const chat = Chat.create()
    const channel = Channel.create({ name, hash, ownerId, chatId: chat.id })

    const hasChatter = await this.chattersRepository.findById(channel.ownerId)

    if (!hasChatter) throw new ChatterNotFoundError()

    const addedChatter = await this.channelsRepository.add(channel)
    return addedChatter.dto
  }
}
