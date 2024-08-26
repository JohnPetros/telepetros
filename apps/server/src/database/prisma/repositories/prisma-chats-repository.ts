import { Chat, type Message, type Chatter } from '@telepetros/core/entities'
import type { IChatsRepository } from '@telepetros/core/interfaces'

import { prisma } from '../client'
import { PrismaChatterMapper, PrismaMessageMapper } from '../mappers'

export class PrismaChatsRepository implements IChatsRepository {
  private readonly messageMapper: PrismaMessageMapper = new PrismaMessageMapper()
  private readonly chatterMapper: PrismaChatterMapper = new PrismaChatterMapper()

  async findById(chatId: string): Promise<Chat | null> {
    const prismaChat = await prisma.chat.findFirst({
      where: {
        id: chatId,
      },
      include: {
        ChattersChats: {
          include: {
            chatter: true,
          },
        },
        Message: true,
      },
    })

    let chatters: Chatter[] = []
    let channelMessages: Message[] = []

    if (!prismaChat) return null

    const chat = Chat.create({
      id: prismaChat.id,
      chatters: [],
      messages: [],
    })

    if (prismaChat?.ChattersChats) {
      chatters = prismaChat?.ChattersChats.map((prismaChatter) =>
        this.chatterMapper.toDomain(prismaChatter.chatter),
      )
    }

    if (prismaChat?.Message) {
      channelMessages = prismaChat?.Message.map((prismaChatter) =>
        this.messageMapper.toDomain(prismaChatter),
      )
    }

    chat.addChatters(chatters)
    chat.addMessages(channelMessages)

    return chat
  }

  async addMessage(message: Message): Promise<Message> {
    const prismaMessage = this.messageMapper.toPrisma(message)

    const addedMessage = await prisma.message.create({
      data: prismaMessage,
    })

    return this.messageMapper.toDomain(addedMessage)
  }
}
