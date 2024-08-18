import type { Channel as PrismaChannel } from '@prisma/client'
import { Channel } from '@telepetros/core/entities'

export class PrismaChannelMapper {
  static toDomain(primasChannel: PrismaChannel): Channel {
    return Channel.create({
      id: primasChannel.id,
      hash: primasChannel.hash,
      name: primasChannel.name,
      isPublic: primasChannel.is_public,
      ownerId: primasChannel.owner_id,
    })
  }

  static toPrisma(channel: Channel): PrismaChannel {
    return {
      id: channel.id,
      hash: channel.hash,
      is_public: channel.isPublic,
      name: channel.name,
      owner_id: channel.ownerId,
    }
  }
}
