import type { Chatter } from '#domain/entities'

export interface ChattersRepository {
  add(chatter: Chatter): Promise<void>
}
