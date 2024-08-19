import type { IApiClient, IAuthService } from '@telepetros/core/interfaces'
import { ServiceResponse } from '@telepetros/core/responses'

export const AuthService = (apiClient: IApiClient): IAuthService => {
  return {
    async loginWithGithub(githubClientCode: string) {
      const response = await apiClient.post<string>('/auth/github', { githubClientCode })

      if (response.isError) {
        return new ServiceResponse({ error: Error })
      }
      const jwt = response.body

      return new ServiceResponse({ data: jwt })
    },
  }
}
