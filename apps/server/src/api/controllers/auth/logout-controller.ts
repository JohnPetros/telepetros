import type { IHttp } from '@telepetros/core/interfaces'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'

export class LogoutController {
  async handle(http: IHttp) {
    await http.destroyJwt()
    return http.send(null, HTTP_STATUS_CODE.ok)
  }
}
