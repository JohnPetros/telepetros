import { notFound } from 'next/navigation'

import { ServerNextApiClient } from '@/infra/api/next'
import { ChannelsService } from '@/infra/api/services/channels-service'
import { ChannelChatPage } from '@/ui/components/pages/channel-chat'

type PageProps = {
  params: {
    channelId: string
  }
}

const Page = async ({ params }: PageProps) => {
  const apiClient = ServerNextApiClient()
  const channelsService = ChannelsService(apiClient)
  const response = await channelsService.fetchChannelChat(params.channelId)

  if (response.isFailure) return notFound()

  return <ChannelChatPage initialData={response.body} />
}

export default Page
