import { HTTP_STATUS_CODE } from '@telepetros/core/constants'
import type { IController, IHttp } from '@telepetros/core/interfaces'
import { LeaveChannelUseCase } from '@telepetros/core/use-cases'

import { channelsRepository, chatsRepository, chattersRepository } from '@/database'

type Params = {
  chatterId: string
  channelId: string
}

export class LeaveChannelController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const useCase = new LeaveChannelUseCase(
      channelsRepository,
      chattersRepository,
      chatsRepository,
    )
    const members = await useCase.execute({
      channelId: http.params.channelId,
      chatterId: http.params.chatterId,
    })
    return http.send(members, HTTP_STATUS_CODE.ok)
  }
}
