import type { ChatDto, ChatterDto } from '@telepetros/core/dtos'
import type { IApiClient, IChattersService } from '@telepetros/core/interfaces'

export const ChattersService = (apiClient: IApiClient): IChattersService => {
  return {
    async fetchChatterChat(chatterId: string) {
      return await apiClient.get<ChatDto>(`/chatters/${chatterId}/chat`)
    },

    async fetchChattersListByChatter(chatterId: string) {
      return await apiClient.get<ChatterDto[]>(`/chatters/chatter/${chatterId}`)
    },

    async fetchChattersListByName(chatterName: string) {
      return await apiClient.get<ChatterDto[]>(`/chatters/name/${chatterName}`)
    },

    async joinChatterChat(chatterId: string) {
      return await apiClient.post<ChatterDto>('/chatters/join', {
        chatterId,
      })
    },
  }
}
