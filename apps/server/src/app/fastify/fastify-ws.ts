import type { FastifyInstance } from 'fastify'

import type { IWs } from '@telepetros/core/interfaces'
import type { WsCallback } from '@telepetros/core/types'
import type { WebSocket } from '@fastify/websocket'
import { RealtimeResponse } from '@telepetros/core/responses'

export class FastifyWs implements IWs {
  constructor(
    private readonly socket: WebSocket,
    private readonly server: FastifyInstance,
  ) {}

  on<Payload>(event: string, callback: WsCallback<Payload>): void {
    this.socket.on('message', (message: string) => {
      const response = RealtimeResponse.parseMessage(message)

      if (event === response.event) {
        callback(response.payload)
      }
    })
  }

  emit(event: string, payload: unknown): void {
    const response = new RealtimeResponse({ event, payload })
    this.socket.send(response.message)
  }

  broadcast(event: string, payload: unknown): void {
    console.log('emit')

    const response = new RealtimeResponse({ event, payload })
    for (const client of this.server.websocketServer.clients) {
      client.send(response.message)
    }
  }
}
