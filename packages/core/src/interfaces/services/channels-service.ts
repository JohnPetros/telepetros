import type { ChannelDto } from '#dtos'
import type { ServiceResponse } from '../../responses'

export interface IChannelsService {
  createChannel(): Promise<ServiceResponse<ChannelDto>>
  listChannelsByChatter(chatterId: string): Promise<ServiceResponse<ChannelDto[]>>
}
