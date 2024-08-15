import type { ChannelDto } from '#dtos'
import { Entity } from '../abstracts'

type ChannelProps = {
  name: string
  hash: string
}

export class Channel extends Entity<ChannelProps> {
  static create(dto: ChannelDto) {
    return new Channel(dto)
  }

  get name() {
    return this.props.name
  }

  get hash() {
    return this.props.hash
  }
}
