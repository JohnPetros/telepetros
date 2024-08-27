import { EVENTS } from '@telepetros/core/constants'
import type { ISocket, IWs } from '@telepetros/core/interfaces'
import { SendMessageUseCase } from '@telepetros/core/use-cases'
import type { MessageDto } from '@telepetros/core/dtos'

import { chatsRepository } from '@/database'

export class ChatSocket implements ISocket {
  handle(ws: IWs): void {
    ws.on<MessageDto>(EVENTS.chat.sendMessage, async (payload) => {
      // const useCase = new SendMessageUseCase(chatsRepository)
      // const messageDto = await useCase.execute(payload)
      ws.broadcast(EVENTS.chat.receiveMessage, payload)
    })
  }
}
