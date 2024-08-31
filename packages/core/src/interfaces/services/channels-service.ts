import type { ChannelDto, ChatDto } from '#dtos'
import type { ApiResponse } from '../../responses'

export interface IChannelsService {
  fetchChannelChat(
    chatterId: string,
  ): Promise<ApiResponse<{ channel: ChannelDto; chat: ChatDto }>>
  fetchChannelsListByChatter(chatterId: string): Promise<ApiResponse<ChannelDto[]>>
  createChannel(
    name: string,
    avatar: string,
    ownerId: string,
  ): Promise<ApiResponse<ChannelDto>>
  joinChannel(inviteCode: string): Promise<ApiResponse<ChannelDto>>
}
