import type { IAuthService, IController, IHttp } from '@telepetros/core/interfaces'

import { COOKIES, ROUTES } from '@/ui/constants'

export const VerifyJwtController = (authService: IAuthService): IController => {
  return {
    async handle(http: IHttp) {
      if (!http.hasCookie(COOKIES.jwt.key)) {
        return http.redirect(`${ROUTES.login}?error=user-not-found`)
      }
      const response = await authService.verifyJwt()
      if (response.isFailure) {
        return http.redirect(ROUTES.login)
      }
    },
  }
}
