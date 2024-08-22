import { ENV } from '@/ui/constants'
import { NextApiClient } from '../next/next-api-client'
import { ChannelsService } from './channels-service'
import { AuthService } from './auth-service'

const apiClient = NextApiClient()
apiClient.setBaseUrl(ENV.serverUrl)

export const authService = AuthService(apiClient)
export const channelsService = ChannelsService(apiClient)
