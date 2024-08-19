import type { ServiceResponse } from '../../responses'

export interface IAuthService {
  loginWithGithub(githubClientCode: string): Promise<ServiceResponse<string>>
}
