import type { IController, IHttp } from '@telepetros/core/interfaces'
import { GetChannelChatUseCase } from '@telepetros/core/use-cases'

import { channelsRepository, chatsRepository } from '@/database'

type Params = {
  channelId: string
}

export class GetChannelChatController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const useCase = new GetChannelChatUseCase(channelsRepository, chatsRepository)

    const channelWithChat = await useCase.execute(http.params.channelId)

    return http.send(channelWithChat)
  }
}
