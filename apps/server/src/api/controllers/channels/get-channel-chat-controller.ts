import { GetChannelChatUseCase } from '@telepetros/core/use-cases'
import type { IController, IHttp } from '@telepetros/core/interfaces'

import { channelsRepository, chatsRepository } from '@/database'

type Params = {
  channelId: string
}

export class GetChannelChatController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const chatter = await http.getChatter()
    const useCase = new GetChannelChatUseCase(channelsRepository, chatsRepository)
    const channelWithChat = await useCase.execute({
      channelId: http.params.channelId,
      chatterDto: chatter,
    })
    return http.send(channelWithChat)
  }
}
