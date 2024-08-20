import type { ServiceResponse } from '../../responses'

export interface IAuthService {
  loginWithGithub(githubClientCode: string): Promise<ServiceResponse<{ jwt: string }>>
}
