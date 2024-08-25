import {
  PrismaChannelsRepository,
  PrismaChattersRepository,
  PrismaChatsRepository,
} from './prisma/repositories'

export const channelsRepository = new PrismaChannelsRepository()
export const chattersRepository = new PrismaChattersRepository()
export const chatsRepository = new PrismaChatsRepository()
