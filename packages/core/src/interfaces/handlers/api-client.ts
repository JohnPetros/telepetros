import type { ApiResponse } from '../../responses'

export interface IApiClient {
  get<ResponseBody>(url: string, body?: unknown): Promise<ApiResponse<ResponseBody>>
  post<ResponseBody>(url: string, body?: unknown): Promise<ApiResponse<ResponseBody>>
  sendFile<ResponseBody>(url: string, body: FormData): Promise<ApiResponse<ResponseBody>>
  setBaseUrl(url: string): void
  setJwt(jwt: string): void
  setHeader(key: string, value: string): void
  setParam(key: string, value: string): void
}
