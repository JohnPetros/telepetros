import {
  PrismaChannelsRepository,
  PrismaChattersRepository,
  PrismaMessagesRepository,
} from './prisma/repositories'

export const channelsRepository = new PrismaChannelsRepository()
export const chattersRepository = new PrismaChattersRepository()
export const messagesRepository = new PrismaMessagesRepository()
