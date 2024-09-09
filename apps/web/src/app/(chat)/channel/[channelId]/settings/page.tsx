import { notFound } from 'next/navigation'

import { ServerNextApiClient } from '@/infra/api/next'
import { ChannelsService } from '@/infra/api/services'
import { ChannelSettingsPage } from '@/ui/components/pages/channel'

type PageProps = {
  params: {
    channelId: string
  }
}

const Page = async ({ params }: PageProps) => {
  const apiClient = ServerNextApiClient()
  const channelsService = ChannelsService(apiClient)
  const response = await channelsService.fetchChannel(params.channelId)

  if (response.isFailure) return notFound()

  return <ChannelSettingsPage channelDto={response.body} />
}

export default Page
