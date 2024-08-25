import type { ApiResponse } from '../../responses'

export interface IAuthService {
  verifyJwt(): Promise<ApiResponse<boolean>>
  loginWithGithub(githubClientCode: string): Promise<ApiResponse<{ jwt: string }>>
  loginWithGoogle(googleClientCode: string): Promise<ApiResponse<{ jwt: string }>>
}
