import type { Chatter } from '#domain/entities'

export interface IChattersRepository {
  findById(id: string): Promise<Chatter | null>
  findByEmail(email: string): Promise<Chatter | null>
  findManyByChatterId(chatterId: string): Promise<Chatter[]>
  add(chatter: Chatter): Promise<Chatter>
}
