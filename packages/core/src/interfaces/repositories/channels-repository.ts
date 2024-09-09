import type { Channel } from '#domain/entities'

export interface IChannelsRepository {
  findById(channelId: string): Promise<Channel | null>
  findByInviteCode(channelInviteCode: string): Promise<Channel | null>
  findManyByChatterId(chatterId: string): Promise<Channel[]>
  updateVisibility(channelId: string, isChannelPublic: boolean): Promise<void>
  add(channel: Channel): Promise<Channel>
}
