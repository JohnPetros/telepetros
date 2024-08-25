import type { IWs } from './ws'

export interface ISocket {
  handle(ws: IWs): void
}
