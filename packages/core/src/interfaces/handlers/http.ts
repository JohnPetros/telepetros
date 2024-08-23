import type { ChatterDto } from '#dtos'

export interface IHttp<Body = void, Params = void> {
  body: Body
  params: Params
  signJwt(chatterDto: ChatterDto): Promise<string>
  verifyJwt(): Promise<boolean>
  getChatter(): Promise<ChatterDto>
  getQuery(key: string): string | null
  setCookie(key: string, value: string, duration: number): void
  getCookie(key: string): string | null
  hasCookie(key: string): boolean
  send(response: unknown, statusCode?: number): unknown
  next(): unknown
  redirect(route: string): unknown
}
