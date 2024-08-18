import type { IHttp } from './http'

export interface IController<Body = void, Query = void> {
  handle(http: IHttp<Body, Query>): Promise<unknown>
}
