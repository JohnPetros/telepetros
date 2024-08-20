import type { Channel } from '#domain/entities'

export interface IChannelsRepository {
  add(channel: Channel): Promise<void>
  findManyByChatterId(chatterId: string): Promise<Channel[]>
}
