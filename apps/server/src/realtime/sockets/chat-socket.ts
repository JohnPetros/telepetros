import type { MessageDto } from '@telepetros/core/dtos'
import type { ISocket, IWs } from '@telepetros/core/interfaces'
import { DeleteMessageUseCase, SendMessageUseCase } from '@telepetros/core/use-cases'
import { EVENTS } from '@telepetros/core/constants'

import { chatsRepository } from '@/database'
import { fileStorageProvider } from '@/providers/file-storage-provider'

export class ChatSocket implements ISocket {
  handle(ws: IWs): void {
    ws.on(EVENTS.chat.sendMessage, async (payload: MessageDto) => {
      const useCase = new SendMessageUseCase(chatsRepository)
      const messageDto = await useCase.execute(payload)
      ws.broadcast(EVENTS.chat.receiveMessage, messageDto)
    })

    ws.on(EVENTS.chat.deleteMessage, async (payload: string) => {
      const useCase = new DeleteMessageUseCase(chatsRepository, fileStorageProvider)
      const deletedMessageId = await useCase.execute(payload)
      ws.broadcast(EVENTS.chat.deleteMessage, deletedMessageId)
    })
  }
}
