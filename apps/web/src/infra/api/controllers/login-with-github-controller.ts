import { COOKIES, ROUTES } from '@/ui/constants'
import type { IAuthService, IController } from '@telepetros/core/interfaces'
import { GithubClientCodeNotFoundError } from '@telepetros/core/errors'

export const LoginWithGithubController = (authService: IAuthService): IController => {
  return {
    async handle(http) {
      const githubClientCode = http.getQuery('code')
      if (!githubClientCode) throw GithubClientCodeNotFoundError

      const response = await authService.loginWithGithub(githubClientCode)

      if (response.isFailure) {
        http.redirect(`${ROUTES.login}?error=${response.errorMessage}`)
      }

      http.setCookie(COOKIES.jwt.key, response.data.jwt, COOKIES.jwt.duration)
      return http.redirect(ROUTES.home)
    },
  }
}
