export type MessageDto = {
  type: string
  value: string
  createdAt: Date
  parentMessageId?: string
}
