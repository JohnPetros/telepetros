import type { ChatterDto } from './chatter-dto'
import type { MessageDto } from './message-dto'

export type ChatDto = {
  chatters: ChatterDto[]
  messages: MessageDto[]
}
