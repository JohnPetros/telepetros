import { LoginWithGithubError } from '@telepetros/core/errors'
import type { IApiClient, IAuthService } from '@telepetros/core/interfaces'
import { ServiceResponse } from '@telepetros/core/responses'

export const AuthService = (apiClient: IApiClient): IAuthService => {
  return {
    async loginWithGithub(githubClientCode: string) {
      const response = await apiClient.post<{ jwt: string }>('/auth/github', {
        githubClientCode,
      })

      if (response.isError) {
        return new ServiceResponse({
          error: LoginWithGithubError,
        })
      }

      return new ServiceResponse({ data: response.body })
    },
  }
}
