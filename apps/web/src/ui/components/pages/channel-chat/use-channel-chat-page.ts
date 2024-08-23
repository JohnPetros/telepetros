import { useApi } from '@/infra/api'
import { CACHE } from '@/ui/constants/cache'
import { useCache } from '@/ui/hooks'

export function useChannelChatPage(channelId: string) {
  const { channelsService } = useApi()

  async function fetchChannel() {
    const response = await channelsService.fetchChannel(channelId)

    if (response.isFailure) {
      console.log(response.errorMessage)
    }
    return response.data
  }

  const { data: channelDto } = useCache({
    key: CACHE.channel.key,
    fetcher: fetchChannel,
  })

  return {
    channel: channelDto,
  }
}
