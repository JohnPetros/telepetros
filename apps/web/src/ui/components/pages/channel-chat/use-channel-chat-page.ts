import { useApi } from '@/infra/api'
import { CACHE } from '@/ui/constants/cache'
import { useCache } from '@/ui/hooks'
import { Channel } from '@telepetros/core/entities'

export function useChannelChatPage(channelId: string) {
  const { channelsService } = useApi()

  async function fetchChannel() {
    const response = await channelsService.fetchChannel(channelId)

    if (response.isFailure) {
      console.log(response.error)
    }
    return response.body
  }

  const { data: channelDto } = useCache({
    key: CACHE.channel.key,
    fetcher: fetchChannel,
  })

  return {
    channel: channelDto ? Channel.create(channelDto) : null,
  }
}
