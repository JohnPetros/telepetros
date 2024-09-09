import type { IController, IHttp } from '@telepetros/core/interfaces'
import { GetChannelUseCase } from '@telepetros/core/use-cases'

import { channelsRepository } from '@/database'

type Params = {
  channelId: string
}

export class GetChannelController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const chatterDto = await http.getChatter()
    const useCase = new GetChannelUseCase(channelsRepository)

    const channel = await useCase.execute({
      channelId: http.params.channelId,
      chatterId: String(chatterDto.id),
    })

    return http.send(channel)
  }
}
