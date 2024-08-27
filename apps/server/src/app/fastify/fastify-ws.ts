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

type Pipes = Record<string, WsCallback[]>

export class FastifyWs implements IWs {
  private readonly socket: WebSocket
  private readonly server: FastifyInstance
  private readonly handlers: any[]
  private readonly pipes: Pipes

  constructor({ server, socket }: FastifyWsProps) {
    this.server = server
    this.socket = socket
    this.handlers = []
    this.pipes = {}

    this.socket.on('message', async (message: string) => {
      for (const handler of this.handlers) {
        const response = RealtimeResponse.parseMessage(message)
        this.socket.data = response.event

        if (handler.event === response.event) {
          await handler.callback(response.payload)
        }
      }
    })
  }

  on<Payload>(event: string, callback: WsCallback<Payload>): void {
    const has = this.handlers.some((handler) => handler.event === event)
    if (!has) this.handlers.push({ event, callback })
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
