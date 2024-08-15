export interface Http<Body = void, Query = void> {
  body: Body
  query: Query
  send(response: unknown, statusCode?: number): unknown
}
