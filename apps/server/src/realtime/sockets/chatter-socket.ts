import { EVENTS } from '@telepetros/core/constants'
import type { ISocket, IWs } from '@telepetros/core/interfaces'
import {
  ConnectChatterUseCase,
  DisconnectChatterUseCase,
} from '@telepetros/core/use-cases'

import { chattersRepository } from '@/database'

export class ChatterSocket implements ISocket {
  constructor(private readonly chatterId: string) {}

  handle(ws: IWs): void {
    ws.on(EVENTS.chat.connectChatter, async () => {
      const useCase = new ConnectChatterUseCase(chattersRepository)
      await useCase.execute(this.chatterId)

      ws.broadcast(EVENTS.chat.connectChatter)
    })

    ws.close(async () => {
      const useCase = new DisconnectChatterUseCase(chattersRepository)
      await useCase.execute(this.chatterId)

      ws.broadcast(EVENTS.chat.disconnectChatter)
    })
  }
}
