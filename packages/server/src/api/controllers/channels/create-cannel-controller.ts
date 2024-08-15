import type { Http, Controller } from '@telepetros/core/interfaces'
import { CreateChannelUseCase } from '@telepetros/core/use-cases'

import { ChannelsRepository } from '#database'
import { Encryptor } from '#utils'

type Body = {
  name: string
}

export class CreateChannelController implements Controller<Body> {
  async handle(http: Http<Body>) {
    const repository = new ChannelsRepository()
    const useCase = new CreateChannelUseCase(repository)

    const encryptor = new Encryptor()
    await useCase.execute({ name: http.body.name, hash: encryptor.generateHash() })

    return http.send({ message: 'ok' })
  }
}
