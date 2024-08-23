import type { ServiceResponse } from '../../responses'

export interface IAuthService {
  verifyJwt(): Promise<ServiceResponse<boolean>>
  loginWithGithub(githubClientCode: string): Promise<ServiceResponse<{ jwt: string }>>
}
