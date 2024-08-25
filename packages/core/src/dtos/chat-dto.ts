import type { ChatterDto } from './chatter-dto'
import type { MessageDto } from './message-dto'

export type ChatDto = {
  id?: string
  chatters: ChatterDto[]
  messages: MessageDto[]
}
