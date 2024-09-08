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
      },
    })

    const prismaMessages = await prisma.message.findMany({
      where: {
        chat_id: chatId,
      },
      include: {
        MessageAttachment: true,
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

    if (prismaMessages) {
      channelMessages = prismaMessages.map((prismaMessage) => {
        return this.messageMapper.toDomain(prismaMessage)
      })
    }

    chat.addChatters(chatters)
    chat.addMessages(channelMessages)

    return chat
  }

  async findIdByChatters(
    firstChatterId: string,
    secondChatterId: string,
  ): Promise<string | null> {
    const result = (await prisma.$queryRaw`
    SELECT chat_id FROM chatter_chats CC
    WHERE 
      (chatter_id = ${firstChatterId} OR chatter_id = ${secondChatterId}) AND
      chat_id NOT IN (SELECT chat_id FROM channels)
    `) as { chat_id: string }[]

    const chatId = result[0]?.chat_id

    if (!chatId) return null

    return chatId
  }

  async addChatterChat(
    firstChatterId: string,
    secondChatterId: string,
    chatId: string,
  ): Promise<void> {
    await prisma.chat.create({
      data: {
        id: chatId,
        ChattersChats: {
          createMany: {
            data: [{ chatter_id: firstChatterId }, { chatter_id: secondChatterId }],
          },
        },
      },
    })
  }

  async addChatterToChat(chatterId: string, chatId: string): Promise<void> {
    await prisma.chattersChats.create({
      data: {
        chatter_id: chatterId,
        chat_id: chatId,
      },
    })
  }

  async addMessage(message: Message): Promise<Message> {
    const prismaMessage = this.messageMapper.toPrisma(message)

    const [addedMessage] = await prisma.$transaction([
      prisma.message.create({
        data: {
          ...prismaMessage,
          ...(message.attachment
            ? {
                MessageAttachment: {
                  create: {
                    name: message.attachment.name,
                    value: message.attachment.value,
                  },
                },
              }
            : undefined),
        },
        include: {
          MessageAttachment: true,
        },
      }),
    ])

    return this.messageMapper.toDomain(addedMessage)
  }
}
