import type { ChatterDto } from '#dtos'
import type { ServiceResponse } from '../../responses'

export interface IGithubService {
  fetchUser(
    clientId: string,
    clientSecret: string,
    clientCode: string,
  ): Promise<ServiceResponse<ChatterDto>>
}
