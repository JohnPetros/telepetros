import type { IController, IHttp } from '@telepetros/core/interfaces'
import { JoinChatterChatUseCase } from '@telepetros/core/use-cases'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'

import { chattersRepository, chatsRepository } from '@/database'

type Body = {
  chatterId: string
}

export class JoinChatterChatController implements IController<Body> {
  async handle(http: IHttp<Body>) {
    const chatterDto = await http.getChatter()
    const useCase = new JoinChatterChatUseCase(chattersRepository, chatsRepository)

    const secondChatterDto = await useCase.execute({
      firstChatterDto: chatterDto,
      secondChatterId: http.body.chatterId,
    })

    return http.send(secondChatterDto, HTTP_STATUS_CODE.created)
  }
}
