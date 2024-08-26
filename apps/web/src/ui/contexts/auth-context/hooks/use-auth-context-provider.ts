import { jwtDecode } from 'jwt-decode'

import type { ChatterDto } from '@telepetros/core/dtos'
import { Chatter } from '@telepetros/core/entities'

export function useAuthContextProvider(jwt: string) {
  const chatterDto = jwtDecode<ChatterDto>(jwt)

  async function logout() {}

  return {
    chatter: Chatter.create(chatterDto),
    logout,
  }
}
