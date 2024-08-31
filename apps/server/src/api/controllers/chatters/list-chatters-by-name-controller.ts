import type { IController, IHttp } from '@telepetros/core/interfaces'
import { ListChattersByNameUseCase } from '@telepetros/core/use-cases'

import { chattersRepository } from '@/database'

type Params = {
  name: string
}

export class ListChattersByNameController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const chatterDto = await http.getChatter()
    const useCase = new ListChattersByNameUseCase(chattersRepository)
    const chattersDto = await useCase.execute({
      name: http.params.name,
      chatterDto,
    })

    return http.send(chattersDto)
  }
}
