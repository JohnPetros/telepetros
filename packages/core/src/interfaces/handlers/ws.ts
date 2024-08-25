import type { WsCallback } from '../../types'

export interface IWs {
  on<Payload>(event: string, callback?: WsCallback<Payload>): void
  send(payload: unknown): void
  emit<Payload>(event: string, payload: unknown, callback?: WsCallback<Payload>): void
  broadcast(event: string, payload: unknown): void
}
