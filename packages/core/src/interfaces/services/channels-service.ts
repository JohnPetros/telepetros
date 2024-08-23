import type { ChannelDto } from '#dtos'
import type { ServiceResponse } from '../../responses'

export interface IChannelsService {
  fetchChannel(chatterId: string): Promise<ServiceResponse<ChannelDto>>
  createChannel(name: string, ownerId: string): Promise<ServiceResponse<ChannelDto>>
  listChannelsByChatter(chatterId: string): Promise<ServiceResponse<ChannelDto[]>>
}
