import { channelsRepository, chatsRepository } from '@/database'
import type { IController, IHttp } from '@telepetros/core/interfaces'
import { JoinChannelByNameUseCase } from '@telepetros/core/use-cases'

type Params = {
  channelName: string
}

export class JoinChannelByNameController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const chatterDto = await http.getChatter()
    const useCase = new JoinChannelByNameUseCase(channelsRepository, chatsRepository)
    const chatId = await useCase.execute({
      channelName: http.params.channelName,
      chatterDto,
    })

    return http.send({ chatId })
  }
}
