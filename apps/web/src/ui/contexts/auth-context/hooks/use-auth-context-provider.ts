import { jwtDecode } from 'jwt-decode'

import type { ChatterDto } from '@telepetros/core/dtos'
import { Chatter } from '@telepetros/core/entities'
import { useChatterSocket } from '@/ui/realtime/sockets'
import { useState } from 'react'

export function useAuthContextProvider(jwt: string) {
  const chatterDto = jwtDecode<ChatterDto>(jwt)

  async function logout() {}

  return {
    chatter: Chatter.create(chatterDto),
    logout,
  }
}
