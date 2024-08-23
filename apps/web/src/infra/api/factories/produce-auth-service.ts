import type { IHttp } from '@telepetros/core/interfaces'

import { apiClient } from '../services'
import { AuthService } from '../services/auth-service'
import { COOKIES } from '@/ui/constants'

export function produceAuthService(http: IHttp) {
  const jwt = http.getCookie(COOKIES.jwt.key)
  if (jwt) apiClient.setHeader('Authorization', `Bearer ${jwt}`)
  return AuthService(apiClient)
}
