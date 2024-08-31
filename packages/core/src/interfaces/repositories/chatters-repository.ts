import type { Chatter } from '#domain/entities'

export interface IChattersRepository {
  findById(id: string): Promise<Chatter | null>
  findByEmail(email: string): Promise<Chatter | null>
  findManyByName(chatterName: string, chatterId: string): Promise<Chatter[]>
  updateChatter(chatter: Chatter): Promise<void>
  findManyByChatterId(chatterId: string): Promise<Chatter[]>
  add(chatter: Chatter): Promise<Chatter>
}
