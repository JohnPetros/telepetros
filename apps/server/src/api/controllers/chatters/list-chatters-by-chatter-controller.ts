import { chattersRepository } from '@/database'
import type { IController, IHttp } from '@telepetros/core/interfaces'

type Params = {
  chatterId: string
}

export class ListChattersByChatterController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const channelsDto = await chattersRepository.findManyByChatterId(
      http.params.chatterId,
    )

    return http.send(channelsDto)
  }
}
