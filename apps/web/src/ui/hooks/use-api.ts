'use client'

import { AuthService } from '@/infra/api/services/auth-service'
import { NextApiClient } from '@/infra/api/next/next-api-client'
import { ChannelsService } from '@/infra/api/services/channels-service'
import { ChattersService } from '@/infra/api/services/chatters-service'
import { UploadService } from '@/infra/api/services/upload-service'
import { useJwtContext } from '@/ui/contexts/jwt-context/use-jwt-context'
import { ENV } from '../constants'

export function useApi() {
  const jwt = useJwtContext()
  const apiClient = NextApiClient()
  apiClient.setBaseUrl(ENV.apiUrl)

  if (jwt) apiClient.setHeader('Authorization', `Bearer ${jwt}`)

  const authService = AuthService(apiClient)
  const channelsService = ChannelsService(apiClient)
  const chattersService = ChattersService(apiClient)
  const uploadService = UploadService(apiClient)

  return {
    authService,
    channelsService,
    chattersService,
    uploadService,
  }
}
