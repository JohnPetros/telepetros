import type { ChannelDto } from '#dtos'
import type { ApiResponse } from '../../responses'

export interface IChannelsService {
  fetchChannel(chatterId: string): Promise<ApiResponse<ChannelDto>>
  createChannel(name: string, ownerId: string): Promise<ApiResponse<ChannelDto>>
  fetchChannelsListByChatter(chatterId: string): Promise<ApiResponse<ChannelDto[]>>
}
