import type { ChatterDto } from '#dtos'
import type { ApiResponse } from '../../responses'

export interface IGithubService {
  fetchUser(
    clientId: string,
    clientSecret: string,
    clientCode: string,
  ): Promise<ApiResponse<ChatterDto>>
}
