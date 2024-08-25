import type { ChannelDto, ChatDto } from '#dtos'
import type { ApiResponse } from '../../responses'

type ChannelWithChatDto = {
  channel: ChannelDto
  chat: ChatDto
}

export interface IChannelsService {
  fetchChannel(chatterId: string): Promise<ApiResponse<ChannelWithChatDto>>
  createChannel(name: string, ownerId: string): Promise<ApiResponse<ChannelDto>>
  fetchChannelsListByChatter(chatterId: string): Promise<ApiResponse<ChannelDto[]>>
}
