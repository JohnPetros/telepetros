import { COOKIES, ROUTES } from '@/ui/constants'
import type { IAuthService, IController } from '@telepetros/core/interfaces'
import { GoogleClientCodeNotFoundError } from '@telepetros/core/errors'

export const LoginWithGoogleController = (authService: IAuthService): IController => {
  return {
    async handle(http) {
      const googleClientCode = http.getQuery('code')
      if (!googleClientCode) throw GoogleClientCodeNotFoundError

      const response = await authService.loginWithGoogle(googleClientCode)

      if (response.isFailure) {
        http.redirect(`${ROUTES.login}?error=${response.errorMessage}`)
      }

      http.setCookie(COOKIES.jwt.key, response.body.jwt, COOKIES.jwt.duration)
      return http.redirect(ROUTES.home)
    },
  }
}
