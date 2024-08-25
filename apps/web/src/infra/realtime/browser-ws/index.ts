import type { IWs } from '@telepetros/core/interfaces'
import { RealtimeResponse } from '@telepetros/core/responses'

export const BrowserWs = (websocket: WebSocket): IWs => {
  return {
    on(event: string, callback) {
      websocket.onmessage = (message) => {
        const response = RealtimeResponse.parseMessage(message.data)
        if (event === response.event) {
          console.log('BrowserWs', response.payload)
        }
      }
    },

    send(payload) {},

    emit(event: string, payload: unknown, callback) {
      const response = new RealtimeResponse({ event, payload })
      websocket.send(response.message)
    },

    async broadcast() {},
  }
}
