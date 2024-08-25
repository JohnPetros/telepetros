import { EVENTS } from '@telepetros/core/constants'
import type { ISocket, IWs } from '@telepetros/core/interfaces'
import { SendMessageUseCase } from '@telepetros/core/use-cases'
import type { MessageDto } from '@telepetros/core/dtos'

import { chatsRepository } from '@/database'

type ConnectChatterPayload = {
  chatterId: string
}

type SendMessagePayload = MessageDto

export class ChatSocket implements ISocket {
  constructor(private readonly chatId: string) {}

  handle(ws: IWs): void {
    ws.on<ConnectChatterPayload>(EVENTS.chat.connectChatter, async (payload) => {
      console.log(payload)
      ws.broadcast(EVENTS.chat.connectChatter, payload)
    })

    ws.on<SendMessagePayload>(EVENTS.chat.sendMessage, async (payload) => {
      const useCase = new SendMessageUseCase(chatsRepository)
      const sentMessageDto = await useCase.execute(payload)
      ws.broadcast(EVENTS.chat.receiveMessage, sentMessageDto)
    })
  }
}
