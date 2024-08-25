import type { Chatter } from '#domain/entities'
import type { ChatterDto } from '#dtos'

export interface IChattersRepository {
  findById(id: string): Promise<ChatterDto | null>
  findByEmail(email: string): Promise<ChatterDto | null>
  findManyByChatterId(chatterId: string): Promise<ChatterDto[]>
  add(chatter: Chatter): Promise<ChatterDto>
}
