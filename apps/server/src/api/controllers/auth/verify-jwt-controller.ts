import type { IController, IHttp } from '@telepetros/core/interfaces'

export class VerifyJwtController implements IController {
  constructor(private readonly isMiddleware = false) {}

  async handle(http: IHttp) {
    return http.send(true)
  }
}
