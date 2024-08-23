import type { ChannelDto } from '#dtos'
import { Entity } from '../abstracts'

type ChannelProps = {
  name: string
  hash: string
  ownerId: string
  isPublic: boolean
  avatar?: string
  chatId: string
}

export class Channel extends Entity<ChannelProps> {
  static create(dto: ChannelDto) {
    return new Channel(
      {
        name: dto.name,
        hash: dto.hash,
        isPublic: dto.isPublic ?? true,
        ownerId: dto.ownerId,
        avatar: dto.avatar,
        chatId: dto.chatId,
      },
      dto.id,
    )
  }

  get name() {
    return this.props.name
  }

  get hash() {
    return this.props.hash
  }

  get avatar() {
    return this.props.avatar
  }

  get isPublic() {
    return this.props.isPublic
  }

  get ownerId() {
    return this.props.ownerId
  }

  get chatId() {
    return this.props.chatId
  }

  get dto(): ChannelDto {
    return {
      id: this.id,
      name: this.name,
      hash: this.hash,
      avatar: this.avatar,
      isPublic: this.isPublic,
      ownerId: this.ownerId,
      chatId: this.chatId,
    }
  }
}
