import type { ChatDto, ChatterDto } from '#dtos'
import type { ApiResponse } from '../../responses'

export interface IChattersService {
  fetchChatterChat(chatterId: string): Promise<ApiResponse<ChatDto>>
  fetchChattersListByChatter(chatterId: string): Promise<ApiResponse<ChatterDto[]>>
  fetchChattersListByName(chatterName: string): Promise<ApiResponse<ChatterDto[]>>
  joinChatterChat(chatterId: string): Promise<ApiResponse<ChatterDto>>
}
