import { ENV } from '@/ui/constants'
import { NextApiClient } from '../next/next-api-client'
import { ChannelsService } from './channels-service'
import { ChattersService } from './chatters-service'

const apiClient = NextApiClient()

apiClient.setBaseUrl(ENV.apiUrl)

export const channelsService = ChannelsService(apiClient)
export const chattersService = ChattersService(apiClient)
export { apiClient }
