import type { IHttp, IController } from '@telepetros/core/interfaces'

import { channelsRepository, chattersRepository } from '@/database'
import { Encryptor } from '@/utils'
import { CreateChannelUseCase } from '@telepetros/core/use-cases'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'

type Body = {
  ownerId: string
  avatar: string
  name: string
}

export class CreateChannelController implements IController<Body> {
  async handle(http: IHttp<Body>) {
    const encryptor = new Encryptor()

    const useCase = new CreateChannelUseCase(channelsRepository, chattersRepository)

    const createdChatterDto = await useCase.execute({
      name: http.body.name,
      avatar: http.body.avatar,
      ownerId: http.body.ownerId,
      hash: encryptor.generateHash(),
    })

    return http.send(createdChatterDto, HTTP_STATUS_CODE.created)
  }
}
