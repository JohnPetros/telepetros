import type { IHttp } from '@telepetros/core/interfaces'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'
import { DeleteChatterUseCase } from '@telepetros/core/use-cases'

import { chattersRepository } from '@/database'

export class DeleteAccountController {
  async handle(http: IHttp) {
    const chatterDto = await http.getChatter()

    const useCase = new DeleteChatterUseCase(chattersRepository)

    if (chatterDto.id) {
      await useCase.execute({ chatterId: chatterDto.id })
      http.destroyJwt()
    }

    return http.send(null, HTTP_STATUS_CODE.ok)
  }
}
