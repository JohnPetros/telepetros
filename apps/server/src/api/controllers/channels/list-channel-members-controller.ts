import { channelsRepository, chattersRepository } from '@/database'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'
import type { IController, IHttp } from '@telepetros/core/interfaces'
import { ListChannelMembersUseCase } from '@telepetros/core/use-cases'

type Params = {
  channelId: string
}

export class ListChannelMembersController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const useCase = new ListChannelMembersUseCase(channelsRepository, chattersRepository)
    const members = await useCase.execute(http.params.channelId)
    return http.send(members, HTTP_STATUS_CODE.ok)
  }
}
