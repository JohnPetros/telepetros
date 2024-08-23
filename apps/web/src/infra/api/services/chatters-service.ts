import { ListChattersByChatterError } from '@telepetros/core/errors'
import type { ChatterDto } from '@telepetros/core/dtos'
import type { IApiClient, IChattersService } from '@telepetros/core/interfaces'
import { ServiceResponse } from '@telepetros/core/responses'

export const ChattersService = (apiClient: IApiClient): IChattersService => {
  return {
    async listChattersByChatter(chatterId: string) {
      const response = await apiClient.get<ChatterDto[]>(`/chatters/chatter/${chatterId}`)

      if (response.isError) {
        return new ServiceResponse({ error: ListChattersByChatterError })
      }

      return new ServiceResponse({ data: response.body })
    },
  }
}
