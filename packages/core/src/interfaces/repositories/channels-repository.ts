import type { Channel } from '#domain/entities'

export interface IChannelsRepository {
  add(channel: Channel): Promise<Channel>
  findManyByChatterId(chatterId: string): Promise<Channel[]>
}
