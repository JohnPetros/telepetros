import { apiClient } from '../services'
import { cookies } from 'next/headers'

import { COOKIES } from '@/ui/constants'

export const ServerNextApiClient = () => {
  const jwt = cookies().get(COOKIES.jwt.key)
  if (jwt) apiClient.setHeader('Authorization', `Bearer ${jwt}`)
  return apiClient
}
