import type { Chatter } from '@telepetros/core/entities'

export type AuthContextValue = {
  chatter: Chatter
  logout: VoidFunction
}
