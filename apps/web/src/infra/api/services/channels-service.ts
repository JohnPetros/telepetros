import type { ChannelDto, ChatDto } from '@telepetros/core/dtos'
import type { IApiClient, IChannelsService } from '@telepetros/core/interfaces'

type ChannelWithChatDto = {
  channel: ChannelDto
  chat: ChatDto
}

export const ChannelsService = (apiClient: IApiClient): IChannelsService => {
  return {
    async fetchChannelChat(chatterId: string) {
      return await apiClient.get<ChannelWithChatDto>(`/channels/${chatterId}/chat`)
    },

    async fetchChannel(chatterId) {
      return await apiClient.get<ChannelDto>(`/channels/${chatterId}`)
    },

    async fetchChannelsListByChatter(chatterId: string) {
      return await apiClient.get<ChannelDto[]>(`/channels/chatter/${chatterId}`)
    },

    async createChannel(name: string, avatar: string, ownerId: string) {
      return await apiClient.post<ChannelDto>('/channels', {
        name,
        avatar,
        ownerId,
      })
    },

    async joinChannel(inviteCode: string) {
      return await apiClient.post<ChannelDto>('/channels/join/', { inviteCode })
    },

    async toggleChannelVisibility(channelId: string, isChannelPublic: boolean) {
      return await apiClient.put(`/channels/${channelId}/visibility`, { isChannelPublic })
    },
  }
}
