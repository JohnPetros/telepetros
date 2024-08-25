import type { Chatter } from '#domain/entities'

export interface IChatSocket {
  connectChatter(
    chatter: Chatter,
    onConnectChatter: (messagesDto: MessageDto) => void,
  ): void
}
