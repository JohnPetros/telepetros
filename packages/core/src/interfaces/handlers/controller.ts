import type { Http } from './http'

export interface Controller<Body> {
  handle(http: Http<Body>): Promise<unknown>
}
