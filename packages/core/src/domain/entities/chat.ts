import { Entity } from '../abstracts'
import type { Chatter } from './chatter'
import type { Message } from './message'

type ChatProps = {
  chatters: Chatter[]
  messages: Message[]
}

export class Chat extends Entity<ChatProps> {
  static create() {
    return new Chat({ chatters: [], messages: [] })
  }

  addChatters(chatters: Chatter[]) {
    this.props.chatters = chatters
  }
}
