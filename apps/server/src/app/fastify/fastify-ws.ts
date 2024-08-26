import type { FastifyInstance } from 'fastify'
import type { WebSocket } from '@fastify/websocket'

import type { IWs } from '@telepetros/core/interfaces'
import type { WsCallback } from '@telepetros/core/types'
import { RealtimeResponse } from '@telepetros/core/responses'

type FastifyWsProps = {
  socket: WebSocket
  server: FastifyInstance
}

export class FastifyWs implements IWs {
  private readonly socket: WebSocket
  private readonly server: FastifyInstance

  constructor({ server, socket }: FastifyWsProps) {
    this.server = server
    this.socket = socket
  }

  on<Payload>(event: string, callback: WsCallback<Payload>): void {
    this.socket.on('message', (message: string) => {
      const response = RealtimeResponse.parseMessage(message)
      this.socket.data = response.event

      if (event === response.event) {
        callback(response.payload)
      }
    })
  }

  close(callback: VoidFunction): void {
    this.socket.on('close', () => {
      callback()
    })
  }

  emit(event: string, payload: unknown): void {
    const response = new RealtimeResponse({ event, payload })
    this.socket.send(response.message)
  }

  broadcast(event: string, payload: unknown): void {
    const response = new RealtimeResponse({ event, payload })
    for (const client of this.server.websocketServer.clients) {
      client.send(response.message)
    }
  }

  get connectionsCount(): number {
    let count = 0

    for (const _ of this.server.websocketServer.clients) count++

    return count
  }
}
