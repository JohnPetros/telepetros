import {
  PrismaChannelsRepository,
  PrismaChattersRepository,
} from './prisma/repositories'

export const channelsRepository = new PrismaChannelsRepository()
export const chattersRepository = new PrismaChattersRepository()
