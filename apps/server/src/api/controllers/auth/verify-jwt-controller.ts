import { chattersRepository } from '@/database'
import { Chatter } from '@telepetros/core/entities'
import { ChatterNotFoundError } from '@telepetros/core/errors'
import type { IController, IHttp } from '@telepetros/core/interfaces'

export class VerifyJwtController implements IController {
  constructor(private readonly isMiddleware = false) {}

  async handle(http: IHttp) {
    const chatterDto = await http.getChatter()
    console.log('getCookie', http.getCookie('jwt'))
    const chatter = Chatter.create(chatterDto)
    const chatterExists = await chattersRepository.findById(chatter.id)

    if (!chatterExists) throw new ChatterNotFoundError()

    return http.send({ ok: true })
  }
}
