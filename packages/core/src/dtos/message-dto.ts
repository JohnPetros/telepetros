export type MessageDto = {
  id?: string
  type: string
  value: string
  chatId: string
  createdAt?: Date
  parentMessageId?: string
}
