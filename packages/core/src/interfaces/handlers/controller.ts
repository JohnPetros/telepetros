import type { Http } from './http'

export interface Controller<Body = void, Query = void> {
  handle(http: Http<Body, Query>): Promise<unknown>
}
