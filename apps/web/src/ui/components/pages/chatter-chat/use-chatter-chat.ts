import type { ChannelDto, ChatDto, ChatterDto } from '@telepetros/core/dtos'
import { CACHE } from '@/ui/constants/cache'
import { useApi, useCache, useToast } from '@/ui/hooks'
import { Chat, Chatter } from '@telepetros/core/entities'

export function useChatterChatPage(chatDto: ChatDto, chatterDto: ChatterDto) {
  const { chattersService } = useApi()
  const toast = useToast()

  async function fetchChannel() {
    if (!chatterDto.id) return

    const response = await chattersService.fetchChatterChat(chatterDto.id)

    if (response.isFailure) {
      toast.showError(response.errorMessage)
      return
    }

    return response.body
  }

  const { data } = useCache({
    key: CACHE.channel.key,
    fetcher: fetchChannel,
    initialData: {
      chat: chatDto,
      chatter: chatterDto,
    },
  })

  return {
    chat: data ? Chat.create(data.chat) : null,
    chatter: data ? Chatter.create(data.chatter) : null,
  }
}
