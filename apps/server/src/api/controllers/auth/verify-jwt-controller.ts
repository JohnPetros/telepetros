import { JwtNotFoundError } from '@telepetros/core/errors'
import type { IController, IHttp } from '@telepetros/core/interfaces'

export class VerifyJwtController implements IController {
  constructor(private readonly isMiddleware = false) {}

  async handle(http: IHttp) {
    const isJwtValid = await http.verifyJwt()

    if (isJwtValid) {
      if (this.isMiddleware) return http.send(true, 200)
      return http.next()
    }

    throw new JwtNotFoundError()
  }
}
