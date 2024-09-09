export type MessageDto = {
  id?: string
  text: string
  chatId: string
  chatterId: string
  sentAt?: Date
  parentMessageId: string | null
  attachment?: {
    name: string
    size: number
    fileId: string
    fileUrl: string
  } | null
}
