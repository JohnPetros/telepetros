import { channelsRepository } from '@/database'
import type { IController, IHttp } from '@telepetros/core/interfaces'

type Params = {
  channelId: string
}

export class GetChannelController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const channelDto = await channelsRepository.findById(http.params.channelId)

    return http.send(channelDto)
  }
}
