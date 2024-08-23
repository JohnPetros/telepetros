import { channelsRepository } from '@/database'
import type { IController, IHttp } from '@telepetros/core/interfaces'

type Params = {
  chatterId: string
}

export class ListChatterChannelsController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const channels = await channelsRepository.findManyByChatterId(http.params.chatterId)

    return http.send(channels.map((chatter) => chatter.dto))
  }
}
