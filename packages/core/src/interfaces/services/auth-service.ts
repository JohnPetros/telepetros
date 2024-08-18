import type { ChatterDto } from '#dtos'
import type { ServiceResponse } from '../../responses'

export interface IAuthService {
  fetchGithubUser(
    githubClientId: string,
    githubClientSecret: string,
    githubClientCode: string,
  ): Promise<ServiceResponse<ChatterDto>>
}
