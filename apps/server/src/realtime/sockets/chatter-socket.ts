import { EVENTS } from '@telepetros/core/constants'
import type { ISocket, IWs } from '@telepetros/core/interfaces'
import {
  ConnectChatterUseCase,
  DisconnectChatterUseCase,
} from '@telepetros/core/use-cases'

import { chattersRepository } from '@/database'

export class ChatterSocket implements ISocket {
  constructor(private chatterId: string | null) {}

  handle(ws: IWs): void {
    ws.on(EVENTS.chatter.connect, async (chatterId: string) => {
      console.log(`Connected ${chatterId}`)

      const useCase = new ConnectChatterUseCase(chattersRepository)
      await useCase.execute(chatterId)

      this.chatterId = chatterId
      ws.broadcast(EVENTS.chatter.connect, chatterId)
    })

    ws.onClose(async () => {
      if (!this.chatterId) return
      console.log(`Disconnected ${this.chatterId}`)

      const useCase = new DisconnectChatterUseCase(chattersRepository)
      await useCase.execute(this.chatterId)

      ws.broadcast(EVENTS.chatter.disconnect, this.chatterId)
    })
  }
}
