import { Entity } from '../abstracts'

type ChatterProps = {
  name: Text
  email: string
  avatar: string
  banner: string
}

export class Chatter extends Entity<ChatterProps> {
  static create() {}
}
