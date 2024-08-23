import { CreateChannelError, ListChannelsByChatterError } from '@telepetros/core/errors'
import type { ChannelDto } from '@telepetros/core/dtos'
import type { IApiClient, IChannelsService } from '@telepetros/core/interfaces'
import { ServiceResponse } from '@telepetros/core/responses'

export const ChannelsService = (apiClient: IApiClient): IChannelsService => {
  return {
    async fetchChannel(chatterId: string) {
      const response = await apiClient.get<ChannelDto>(`/channels/${chatterId}`)

      if (response.isError) {
        return new ServiceResponse({ error: ListChannelsByChatterError })
      }

      return new ServiceResponse({ data: response.body })
    },

    async createChannel(name: string, ownerId: string) {
      const response = await apiClient.post<ChannelDto>('/channels', {
        name,
        ownerId,
      })

      if (response.isError) {
        return new ServiceResponse({ error: CreateChannelError })
      }

      return new ServiceResponse({ data: response.body })
    },

    async listChannelsByChatter(chatterId: string) {
      const response = await apiClient.get<ChannelDto[]>(`/channels/chatter/${chatterId}`)

      if (response.isError) {
        return new ServiceResponse({ error: ListChannelsByChatterError })
      }

      return new ServiceResponse({ data: response.body })
    },
  }
}
