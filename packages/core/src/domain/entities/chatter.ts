import type { ChatterDto } from '#dtos'
import { Entity } from '../abstracts'

type ChatterProps = {
  name: string
  email: string
  avatar: string
  banner: string
}

export class Chatter extends Entity<ChatterProps> {
  static create(dto: ChatterDto): Chatter {
    return new Chatter(
      {
        name: dto.name,
        email: dto.email,
        avatar: dto.avatar,
        banner: dto.banner ?? '',
      },
      dto.id,
    )
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get avatar() {
    return this.props.avatar
  }

  get banner() {
    return this.props.banner
  }

  get dto(): ChatterDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      banner: this.banner,
    }
  }
}
