import type { ChannelDto } from '@telepetros/core/dtos'
import type { IApiClient, IChannelsService } from '@telepetros/core/interfaces'

export const ChannelsService = (apiClient: IApiClient): IChannelsService => {
  return {
    async fetchChannel(chatterId: string) {
      return await apiClient.get<ChannelDto>(`/channels/${chatterId}`)
    },

    async fetchChannelsListByChatter(chatterId: string) {
      return await apiClient.get<ChannelDto[]>(`/channels/chatter/${chatterId}`)
    },

    async createChannel(name: string, ownerId: string) {
      return await apiClient.post<ChannelDto>('/channels', {
        name,
        ownerId,
      })
    },
  }
}
