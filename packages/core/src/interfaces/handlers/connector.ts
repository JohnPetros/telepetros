import type { IWs } from './ws'

export interface IConnector {
  handle(ws: IWs): void
}
