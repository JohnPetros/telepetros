import type { Message, MessageAttachment } from '@prisma/client'

export type PrismaMessage = Message & { MessageAttachment: MessageAttachment | null }
