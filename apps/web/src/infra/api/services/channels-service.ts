import type { ChannelDto, ChatDto } from '@telepetros/core/dtos'
import type { IApiClient, IChannelsService } from '@telepetros/core/interfaces'

type ChannelWithChatDto = {
  channel: ChannelDto
  chat: ChatDto
}

export const ChannelsService = (apiClient: IApiClient): IChannelsService => {
  return {
    async fetchChannel(chatterId: string) {
      return await apiClient.get<ChannelWithChatDto>(`/channels/${chatterId}`)
    },

    async fetchChannelsListByChatter(chatterId: string) {
      const response = await apiClient.get<ChannelDto[]>(`/channels/chatter/${chatterId}`)

      return response
    },

    async createChannel(name: string, avatar: string, ownerId: string) {
      return await apiClient.post<ChannelDto>('/channels', {
        name,
        avatar,
        ownerId,
      })
    },
  }
}
