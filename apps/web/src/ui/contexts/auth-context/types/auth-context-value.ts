import type { Chatter } from '@telepetros/core/entities'

export type AuthContextValue = {
  authChatter: Chatter
  logout: VoidFunction
}
