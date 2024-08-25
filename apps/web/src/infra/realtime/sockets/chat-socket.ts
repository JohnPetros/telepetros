import { EVENTS } from '@telepetros/core/constants'
import type { MessageDto } from '@telepetros/core/dtos'
import type { IWs } from '@telepetros/core/interfaces'

export const ChatSocket = (ws: IWs) => {
  return {
    connectChatter(
      chatterId: string,
      onConnectChatter: (messagesDto: MessageDto) => void,
    ) {
      ws.emit(EVENTS.chat.connectChatter, { chatterId }, onConnectChatter)
    },
  }
}
