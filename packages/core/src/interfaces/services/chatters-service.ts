import type { ChatterDto } from '#dtos'
import type { ApiResponse } from '../../responses'

export interface IChattersService {
  fetchChattersListByChatter(chatterId: string): Promise<ApiResponse<ChatterDto[]>>
}
