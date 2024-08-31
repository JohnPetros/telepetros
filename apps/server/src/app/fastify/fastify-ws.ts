import type { FastifyInstance } from 'fastify'
import type { WebSocket } from '@fastify/websocket'

import type { IWs } from '@telepetros/core/interfaces'
import type { WsCallback } from '@telepetros/core/types'
import { RealtimeResponse } from '@telepetros/core/responses'
import { pubsub } from '@/utils'

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
    this.socket.on('message', async (message: string) => {
      const response = RealtimeResponse.parseMessage(message)

      if (event === response.event) {
        callback(response.payload)
      }
    })
  }

  onClose(callback: VoidFunction): void {
    this.socket.on('close', () => {
      callback()
    })
  }

  emit(event: string, payload: unknown): void {
    const response = new RealtimeResponse({ event, payload })
    this.socket.send(response.message)
  }

  subscribe(pipeName: string, callback: WsCallback) {
    pubsub.subscribe(pipeName, callback)
  }

  publish(pipeName: string, payload: unknown) {
    pubsub.publish(pipeName, payload)
  }

  broadcast(event: string, payload: unknown): void {
    const response = new RealtimeResponse({ event, payload })
    for (const client of this.server.websocketServer.clients) {
      client.send(response.message)
    }
  }
}
