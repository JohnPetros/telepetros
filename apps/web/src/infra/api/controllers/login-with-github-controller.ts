import { COOKIES } from '@/ui/constants'
import type { IAuthService, IController } from '@telepetros/core/interfaces'
import { GithubClientCodeNotFoundError } from '@telepetros/core/errors'

export const LoginWithGithubController = (authService: IAuthService): IController => {
  return {
    async handle(http) {
      const githubClientCode = http.getQuery('code')

      if (!githubClientCode) throw new GithubClientCodeNotFoundError()

      const response = await authService.loginWithGithub(githubClientCode)
      if (response.isFailure) response.throwError()

      http.setCookie(COOKIES.jwt.key, response.data, COOKIES.jwt.duration)

      return http.send({ jtw: response.data })
    },
  }
}
