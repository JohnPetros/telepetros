import { HTTP_STATUS_CODE } from '@telepetros/core/constants'
import type { IController, IHttp } from '@telepetros/core/interfaces'
import { ToggleChannelVisibilityUseCase } from '@telepetros/core/use-cases'

import { channelsRepository } from '@/database'

type Body = {
  isChannelPublic: boolean
}

type RouteParams = {
  channelId: string
}

export class ToggleChannelVisibilityController implements IController<Body, RouteParams> {
  async handle(http: IHttp<Body, RouteParams>) {
    const chatterDto = await http.getChatter()
    const useCase = new ToggleChannelVisibilityUseCase(channelsRepository)
    await useCase.execute({
      channelId: http.params.channelId,
      isChannelPublic: http.body.isChannelPublic,
      chatterId: String(chatterDto.id),
    })

    return http.send(null, HTTP_STATUS_CODE.ok)
  }
}
