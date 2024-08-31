import { cookies } from 'next/headers'

import { COOKIES, ENV } from '@/ui/constants'
import { NextApiClient } from './next-api-client'

export const ServerNextApiClient = () => {
  const apiClient = NextApiClient()
  apiClient.setBaseUrl(ENV.apiUrl)

  const jwt = cookies().get(COOKIES.jwt.key)?.value

  if (jwt) apiClient.setHeader('Authorization', `Bearer ${jwt}`)
  return apiClient
}
