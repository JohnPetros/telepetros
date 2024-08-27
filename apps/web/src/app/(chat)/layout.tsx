import type { ReactNode } from 'react'

import { ChatLayout } from '@/ui/components/layouts/chat'
import { AuthContextProvider } from '@/ui/contexts/auth-context'
import { ChattersConnectionContextProvider } from '@/ui/contexts/chatters-connection-context'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthContextProvider>
      <ChattersConnectionContextProvider>
        <ChatLayout>{children}</ChatLayout>
      </ChattersConnectionContextProvider>
    </AuthContextProvider>
  )
}
