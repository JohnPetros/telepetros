import { chattersRepository } from '@/database'
import type { IController, IHttp } from '@telepetros/core/interfaces'

export class VerifyJwtController implements IController {
  constructor(private readonly isMiddleware = false) {}

  async handle(http: IHttp) {
    await http.getChatter()
    // chattersRepository.findById()

    return http.send(true)
  }
}
