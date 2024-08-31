import { channelsRepository, chatsRepository } from '@/database'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'
import type { IController, IHttp } from '@telepetros/core/interfaces'
import { JoinChannelUseCase } from '@telepetros/core/use-cases'

type Body = {
  inviteCode: string
}

export class JoinChannelController implements IController<Body> {
  async handle(http: IHttp<Body>) {
    const chatterDto = await http.getChatter()
    const useCase = new JoinChannelUseCase(channelsRepository, chatsRepository)
    const joinedChannelDto = await useCase.execute({
      inviteCode: http.body.inviteCode,
      chatterDto,
    })

    return http.send(joinedChannelDto, HTTP_STATUS_CODE.created)
  }
}
