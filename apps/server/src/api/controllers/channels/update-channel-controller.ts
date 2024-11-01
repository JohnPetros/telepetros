import type { IController, IHttp } from '@telepetros/core/interfaces'
import type { ChannelDto } from '@telepetros/core/dtos'
import { UpdateChannelUseCase } from '@telepetros/core/use-cases'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'

import { channelsRepository } from '@/database'

type Body = Partial<ChannelDto>

type RouteParams = {
  channelId: string
}

export class UpdateChannelController implements IController<Body, RouteParams> {
  async handle(http: IHttp<Body, RouteParams>) {
    const chatterDto = await http.getChatter()
    const channelDto = http.body

    const useCase = new UpdateChannelUseCase(channelsRepository)
    await useCase.execute({
      channelId: http.params.channelId,
      chatterDto,
      channelDto,
    })

    return http.send(null, HTTP_STATUS_CODE.ok)
  }
}
