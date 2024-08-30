import { channelsRepository, chatsRepository } from '@/database'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'
import type { IController, IHttp } from '@telepetros/core/interfaces'
import { JoinChannelUseCase } from '@telepetros/core/use-cases'

type Params = {
  inviteCode: string
}

export class JoinChannelController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const chatterDto = await http.getChatter()
    const useCase = new JoinChannelUseCase(channelsRepository, chatsRepository)
    const joinedChannel = await useCase.execute({
      inviteCode: http.params.inviteCode,
      chatterDto,
    })

    return http.send(joinedChannel, HTTP_STATUS_CODE.created)
  }
}
