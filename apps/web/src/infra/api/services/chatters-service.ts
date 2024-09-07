import type { ChatDto, ChatterDto } from '@telepetros/core/dtos'
import type { IApiClient, IChattersService } from '@telepetros/core/interfaces'

export const ChattersService = (apiClient: IApiClient): IChattersService => {
  return {
    async fetchChattersListByChatter(chatterId: string) {
      return await apiClient.get<ChatterDto[]>(`/chatters/chatter/${chatterId}`)
    },

    async fetchChatterChat(chatterId: string) {
      return await apiClient.get<{ chatter: ChatterDto; chat: ChatDto }>(
        `/chatters/${chatterId}/chat`,
      )
    },

    async fetchChattersListByName(chatterName: string) {
      return await apiClient.get<ChatterDto[]>(`/chatters/name/${chatterName}`)
    },

    async joinChatterChat(chatterId: string) {
      return await apiClient.post<ChatterDto>('/chatters/join', { chatterId })
    },
  }
}
