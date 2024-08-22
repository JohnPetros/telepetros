import type { Chatter } from '@telepetros/core/entities'

export type AuthContextValue = {
  chatter: Chatter | null
  logout: VoidFunction
}
