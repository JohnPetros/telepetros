import type { ReactNode } from 'react'

import { ChatLayout } from '@/ui/components/layouts/chat'
import { AuthContextProvider } from '@/ui/contexts/auth-context'
import { cookies } from 'next/headers'
import { COOKIES } from '@/ui/constants'
import { UnauthorizedError } from '@telepetros/core/errors'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const jwt = cookies().get(COOKIES.jwt.key)?.value

  if (!jwt) throw new UnauthorizedError()

  return (
    <AuthContextProvider jwt={jwt}>
      <ChatLayout>{children}</ChatLayout>
    </AuthContextProvider>
  )
}
