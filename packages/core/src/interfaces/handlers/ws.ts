import type { WsCallback } from '../../types'

export interface IWs {
  on<Payload>(event: string, callback?: WsCallback<Payload>): void
  close(callback?: VoidFunction): void
  emit(event: string, payload: unknown): void
  broadcast(event: string, payload?: unknown): void
}
