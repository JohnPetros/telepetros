import type { Http, Controller } from '@telepetros/core/interfaces'
import { ListChatterChannelsUseCase } from '@telepetros/core/use-cases'
import { ChannelsRepository } from '@/database'

type Query = {
  chatter_id: string
}

export class ListChatterChannelsController implements Controller<void, Query> {
  async handle(http: Http<void, Query>) {
    const repository = new ChannelsRepository()
    const useCase = new ListChatterChannelsUseCase(repository)

    const channelsDto = await useCase.execute(http.query.chatter_id)

    return http.send(channelsDto)
  }
}
