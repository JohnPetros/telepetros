export type MessageDto = {
  id?: string
  type: string
  value: string
  chatId: string
  chatterId: string
  sentAt?: Date
  parentMessageId?: string
}
