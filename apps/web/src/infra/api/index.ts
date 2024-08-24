'use client'

import { useJwtContext } from '@/ui/contexts/jwt-context/use-jwt-context'
import { apiClient, channelsService, chattersService } from './services'
import { AuthService } from './services/auth-service'

export function useApi() {
  const jwt = useJwtContext()
  if (jwt) apiClient.setHeader('Authorization', `Bearer ${jwt}`)

  const authService = AuthService(apiClient)

  return {
    authService,
    channelsService,
    chattersService,
  }
}
