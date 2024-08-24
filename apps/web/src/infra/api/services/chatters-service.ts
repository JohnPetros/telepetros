import type { ChatterDto } from '@telepetros/core/dtos'
import type { IApiClient, IChattersService } from '@telepetros/core/interfaces'

export const ChattersService = (apiClient: IApiClient): IChattersService => {
  return {
    async fetchChattersListByChatter(chatterId: string) {
      return await apiClient.get<ChatterDto[]>(`/chatters/chatter/${chatterId}`)
    },
  }
}
