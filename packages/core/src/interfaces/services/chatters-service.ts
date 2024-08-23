import type { ChatterDto } from '#dtos'
import type { ServiceResponse } from '../../responses'

export interface IChattersService {
  listChattersByChatter(chatterId: string): Promise<ServiceResponse<ChatterDto[]>>
}
