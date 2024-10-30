import { Chat, type Message, type Chatter } from '@telepetros/core/entities'
import type { IChatsRepository } from '@telepetros/core/interfaces'

import { prisma } from '../client'
import { PrismaError } from '../utils'
import { PrismaChatterMapper, PrismaMessageMapper } from '../mappers'

export class PrismaChatsRepository implements IChatsRepository {
  private readonly messageMapper: PrismaMessageMapper = new PrismaMessageMapper()
  private readonly chatterMapper: PrismaChatterMapper = new PrismaChatterMapper()

  async findById(chatId: string): Promise<Chat | null> {
    try {
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
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findIdByChatters(
    firstChatterId: string,
    secondChatterId: string,
  ): Promise<string | null> {
    try {
      const result = (await prisma.$queryRaw`
        SELECT chat_id FROM chatter_chats CC
        WHERE 
          (chatter_id = ${firstChatterId} OR chatter_id = ${secondChatterId}) AND
          chat_id NOT IN (SELECT chat_id FROM channels)
        `) as { chat_id: string }[]

      const chatId = result[0]?.chat_id

      if (!chatId) return null

      return chatId
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findMessageById(messageId: string): Promise<Message | null> {
    try {
      const prismaMessage = await prisma.message.findFirst({
        where: { id: messageId },
        include: { MessageAttachment: true },
      })

      if (!prismaMessage) return null

      return this.messageMapper.toDomain(prismaMessage)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async addChatterChat(
    firstChatterId: string,
    secondChatterId: string,
    chatId: string,
  ): Promise<void> {
    try {
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
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async addChatterToChat(chatterId: string, chatId: string): Promise<void> {
    try {
      await prisma.chattersChats.create({
        data: {
          chatter_id: chatterId,
          chat_id: chatId,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async addMessage(message: Message): Promise<Message> {
    try {
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
                      size: message.attachment.size,
                      file_url: message.attachment.fileUrl,
                      file_id: message.attachment.fileId,
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
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async updateMessageText(messageId: string, newText: string): Promise<void> {
    try {
      await prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          text: newText,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async removeMessage(messageId: string): Promise<void> {
    try {
      await prisma.message.delete({ where: { id: messageId } })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async removeChatterChat(chatterId: string, chatId: string): Promise<void> {
    try {
      await prisma.message.delete({ where: { id: chatId, chatter_id: chatterId } })
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
