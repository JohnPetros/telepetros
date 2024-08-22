import type { IController } from '@telepetros/core/interfaces'

import { COOKIES, ROUTES } from '@/ui/constants'

export const VerifyJwtController = (): IController => {
  return {
    async handle(http) {
      if (!http.hasCookie(COOKIES.jwt.key)) {
        return http.redirect(`${ROUTES.login}?error=user-not-found`)
      }

      return http.next()
    },
  }
}
