import type { MessageDto } from './message-dto'

export type ChatDto = {
  chattersIds: string[]
  messages: MessageDto[]
}
