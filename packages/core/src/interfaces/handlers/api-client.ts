import type { HttpReponse } from '../../responses'

export interface IApiClient {
  get<ResponseBody>(url: string, body?: unknown): Promise<HttpReponse<ResponseBody>>
  post<ResponseBody>(url: string, body?: unknown): Promise<HttpReponse<ResponseBody>>
  setBaseUrl(url: string): void
  setJwt(jwt: string): void
  setHeader(key: string, value: string): void
  setParam(key: string, value: string): void
}
