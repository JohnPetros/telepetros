import type { IApiClient, IAuthService } from '@telepetros/core/interfaces'

export const AuthService = (apiClient: IApiClient): IAuthService => {
  return {
    async verifyJwt() {
      return await apiClient.get<boolean>('/auth/jwt')
    },

    async loginWithGithub(githubClientCode: string) {
      return await apiClient.post<{ jwt: string }>('/auth/github', {
        githubClientCode,
      })
    },
  }
}
