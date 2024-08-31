import type { ChannelDto, ChatDto } from '#dtos'
import type { ApiResponse } from '../../responses'

type ChannelWithChatDto = {
  channel: ChannelDto
  chat: ChatDto
}

export interface IChannelsService {
  fetchChannelChat(chatterId: string): Promise<ApiResponse<ChannelWithChatDto>>
  fetchChannelsListByChatter(chatterId: string): Promise<ApiResponse<ChannelDto[]>>
  createChannel(
    name: string,
    avatar: string,
    ownerId: string,
  ): Promise<ApiResponse<ChannelDto>>
  joinChannel(inviteCode: string): Promise<ApiResponse<ChannelDto>>
}
