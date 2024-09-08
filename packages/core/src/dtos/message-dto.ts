export type MessageDto = {
  id?: string
  text: string
  chatId: string
  chatterId: string
  sentAt?: Date
  parentMessageId?: string
  attachment?: {
    name: string
    value: string
  } | null
}
