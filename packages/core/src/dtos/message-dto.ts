export type MessageDto = {
  id?: string
  type: string
  value: string
  chatId: string
  chatterId: string
  createdAt?: Date
  parentMessageId?: string
}
