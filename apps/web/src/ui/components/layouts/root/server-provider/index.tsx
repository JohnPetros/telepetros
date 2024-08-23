import type { ReactNode } from 'react'
import { cookies } from 'next/headers'

import { COOKIES } from '@/ui/constants'
import { JwtContextProvider } from '@/ui/contexts/jwt-context'

type ServerProviderProps = { children: ReactNode }

export function ServerProvider({ children }: ServerProviderProps) {
  const jwt = cookies().get(COOKIES.jwt.key)?.value

  return <JwtContextProvider jwt={jwt ?? null}>{children}</JwtContextProvider>
}
