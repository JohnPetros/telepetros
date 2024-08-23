import type { IHttp, IController } from '@telepetros/core/interfaces'
import { Channel } from '@telepetros/core/entities'

import { channelsRepository, chattersRepository } from '@/database'
import { Encryptor } from '@/utils'
import { HTTP_STATUS_CODE } from '@/constants/http-status-code'
import { CreateChannelUseCase } from '@telepetros/core/use-cases'

type Body = {
  ownerId: string
  name: string
}

export class CreateChannelController implements IController<Body> {
  async handle(http: IHttp<Body>) {
    const encryptor = new Encryptor()

    const useCase = new CreateChannelUseCase(channelsRepository, chattersRepository)

    const createdChatterDto = await useCase.execute({
      name: http.body.name,
      ownerId: http.body.ownerId,
      hash: encryptor.generateHash(),
    })

    return http.send(createdChatterDto, HTTP_STATUS_CODE.created)
  }
}
