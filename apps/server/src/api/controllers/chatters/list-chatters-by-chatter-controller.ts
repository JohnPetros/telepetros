import { chattersRepository } from '@/database'
import type { IController, IHttp } from '@telepetros/core/interfaces'

type Params = {
  id: string
}

export class ListChattersByChatterController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const chatters = await chattersRepository.findManyByChatterId(http.params.id)

    return http.send(chatters.map((channel) => channel.dto))
  }
}
