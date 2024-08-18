import type { ChannelDto } from '#dtos'
import { Entity } from '../abstracts'

type ChannelProps = {
  name: string
  hash: string
  ownerId: string
  isPublic: boolean
}

export class Channel extends Entity<ChannelProps> {
  static create(dto: ChannelDto) {
    return new Channel(
      {
        name: dto.name,
        hash: dto.hash,
        isPublic: dto.isPublic ?? true,
        ownerId: dto.ownerId,
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

  get isPublic() {
    return this.props.isPublic
  }

  get ownerId() {
    return this.props.ownerId
  }

  get dto(): ChannelDto {
    return {
      id: this.id,
      name: this.name,
      hash: this.hash,
      isPublic: this.isPublic,
      ownerId: this.ownerId,
    }
  }
}
