import type { Http, Controller } from '@telepetros/core/interfaces'
import type { ChannelDto } from '@telepetros/core/dtos'
import { CreateChannelUseCase } from '@telepetros/core/use-cases'

import { ChannelsRepository } from '@/database'
import { Encryptor } from '@/utils'

export class CreateChannelController implements Controller<ChannelDto> {
  async handle(http: Http<ChannelDto>) {
    const repository = new ChannelsRepository()
    const useCase = new CreateChannelUseCase(repository)

    const encryptor = new Encryptor()
    await useCase.execute({
      name: http.body.name,
      ownerId: http.body.ownerId,
      hash: encryptor.generateHash(),
    })

    return http.send(null)
  }
}
