import { Entity } from '../abstracts'

type ChatterProps = {
  name: string
  email: string
  avatar: string
  banner: string
}

export class Chatter extends Entity<ChatterProps> {
  static create() {}

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
}
