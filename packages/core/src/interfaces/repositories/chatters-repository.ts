import type { Chatter } from '#domain/entities'

export interface IChattersRepository {
  findById(id: string): Promise<Chatter | null>
  add(chatter: Chatter): Promise<void>
}
