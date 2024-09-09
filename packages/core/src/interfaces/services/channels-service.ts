import type { ChannelDto, ChatDto } from '#dtos'
import type { ApiResponse } from '../../responses'

export interface IChannelsService {
  fetchChannelChat(
    chatterId: string,
  ): Promise<ApiResponse<{ channel: ChannelDto; chat: ChatDto }>>
  fetchChannel(chatterId: string): Promise<ApiResponse<ChannelDto>>
  fetchChannelsListByChatter(chatterId: string): Promise<ApiResponse<ChannelDto[]>>
  createChannel(
    name: string,
    avatar: string,
    ownerId: string,
  ): Promise<ApiResponse<ChannelDto>>
  toggleChannelVisibility(
    channelId: string,
    isPublic: boolean,
  ): Promise<ApiResponse<void>>
  joinChannel(inviteCode: string): Promise<ApiResponse<ChannelDto>>
}
