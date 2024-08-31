import type { ChannelDto, ChatDto } from '@telepetros/core/dtos'
import { CACHE } from '@/ui/constants/cache'
import { useApi, useCache, useToast } from '@/ui/hooks'
import { Channel, Chat } from '@telepetros/core/entities'

type ChannelChatPageProps = {
  channel: ChannelDto
  chat: ChatDto
}

export function useChannelChatPage(initialData: ChannelChatPageProps) {
  const { channelsService } = useApi()
  const toast = useToast()

  async function fetchChannel() {
    if (!initialData.channel.id) return
    const response = await channelsService.fetchChannelChat(initialData.channel.id)

    if (response.isFailure) {
      toast.showError(response.errorMessage)
      return
    }

    return response.body
  }

  const { data } = useCache({
    key: CACHE.channel.key,
    fetcher: fetchChannel,
    initialData,
  })

  return {
    channel: data ? Channel.create(data.channel) : null,
    chat: data ? Chat.create(data.chat) : null,
  }
}
