import type { Chatter, Message } from '#domain/entities'
import type { ChatterDto, MessageDto } from '#dtos'

type ConnectChatterPayload = {
  messages: MessageDto[]
  chatters: ChatterDto[]
}

export interface IChatSocket {
  connectChatter(
    isChannel: boolean,
    onConnectChatter: (payload: ConnectChatterPayload) => void,
  ): void
  sendMessage(message: Message): void
  onReceiveMessage(callback: (message: Message) => void): void
}
