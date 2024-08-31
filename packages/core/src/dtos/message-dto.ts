export type MessageDto = {
  id?: string
  text: string
  chatId: string
  chatterId: string
  attachment?: string
  sentAt?: Date
  parentMessageId?: string
}
