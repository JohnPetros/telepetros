import { EVENTS } from '@telepetros/core/constants'
import type { IConnector, IWs } from '@telepetros/core/interfaces'

type Payload = {
  chatterId: string
}

export class ChatConnector implements IConnector {
  constructor(private readonly chatId: string) {}

  handle(ws: IWs): void {
    ws.on<Payload>(EVENTS.chat.connectChatter, (payload) => {
      ws.emit(EVENTS.chat.receiveMessage, 'Message')
    })
  }
}
