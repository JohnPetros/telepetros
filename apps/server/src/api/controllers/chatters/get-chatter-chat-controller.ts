import type { IController, IHttp } from '@telepetros/core/interfaces'

import { chattersRepository, chatsRepository } from '@/database'
import { GetChatterChatUseCase } from '@telepetros/core/use-cases'

type Params = {
  chatterId: string
}

export class GetChatterChatController implements IController<void, Params> {
  async handle(http: IHttp<void, Params>) {
    const chatterDto = await http.getChatter()
    const useCase = new GetChatterChatUseCase(chattersRepository, chatsRepository)

    const chatterWithChat = await useCase.execute({
      chatterId: http.params.chatterId,
      chatterDto,
    })

    return http.send(chatterWithChat)
  }
}
