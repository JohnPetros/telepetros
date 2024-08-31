import type { IHttp } from '@telepetros/core/interfaces'

import { COOKIES, ENV } from '@/ui/constants'
import { NextApiClient } from '../next'

export const HttpNextApiClient = (http: IHttp) => {
  const jwt = http.getCookie(COOKIES.jwt.key)
  const apiClient = NextApiClient()
  apiClient.setBaseUrl(ENV.apiUrl)

  if (jwt) apiClient.setHeader('Authorization', `Bearer ${jwt}`)
  return apiClient
}
