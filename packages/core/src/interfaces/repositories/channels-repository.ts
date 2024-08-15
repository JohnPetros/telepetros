import type { Channel } from '#domain/entities'

export interface ChannelsRepository {
  add(channel: Channel): Promise<void>
}
