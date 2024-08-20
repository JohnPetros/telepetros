import { COOKIES } from '@/ui/constants'
import type { IAuthService, IController } from '@telepetros/core/interfaces'
import { GithubClientCodeNotFoundError } from '@telepetros/core/errors'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'

export const LoginWithGithubController = (authService: IAuthService): IController => {
  return {
    async handle(http) {
      const githubClientCode = http.getQuery('code')
      if (!githubClientCode) throw GithubClientCodeNotFoundError

      const response = await authService.loginWithGithub(githubClientCode)

      if (response.isFailure) {
        return http.send(null, HTTP_STATUS_CODE.serverError)
      }

      http.setCookie(COOKIES.jwt.key, response.data.jwt, COOKIES.jwt.duration)
      return http.send(response.data)
    },
  }
}
