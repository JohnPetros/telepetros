import type { Chatter } from '#domain/entities'

export interface ChattersRepository {
  findById(id: string): Promise<Chatter | null>
  add(chatter: Chatter): Promise<void>
}
