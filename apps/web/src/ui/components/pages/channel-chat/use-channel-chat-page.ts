import { useApi } from '@/infra/api'
import { CACHE } from '@/ui/constants/cache'
import { useCache } from '@/ui/hooks'
import { Channel, Chat } from '@telepetros/core/entities'

export function useChannelChatPage(channelId: string) {
  const { channelsService } = useApi()

  async function fetchChannel() {
    const response = await channelsService.fetchChannel(channelId)

    if (response.isFailure) {
      console.log(response.error)
    }
    return response.body
  }

  const { data } = useCache({
    key: CACHE.channel.key,
    fetcher: fetchChannel,
  })

  return {
    channel: data ? Channel.create(data.channel) : null,
    chat: data ? Chat.create(data.chat) : null,
  }
}
