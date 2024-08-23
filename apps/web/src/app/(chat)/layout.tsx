import type { ReactNode } from 'react'

import { ChatLayout } from '@/ui/components/layouts/chat'
import { AuthContextProvider } from '@/ui/contexts/auth-context'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthContextProvider>
      <ChatLayout>{children}</ChatLayout>
    </AuthContextProvider>
  )
}
