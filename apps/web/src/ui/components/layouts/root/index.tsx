import type { ReactNode } from 'react'

import { FONT_SANS } from '@/ui/constants/fonts'
import { ClientProvider } from './client-provider'
import { ServerProvider } from './server-provider'

type RootLayoutProps = { children: ReactNode }

export async function RootLayout({ children }: RootLayoutProps) {
  return (
    <body className={`min-h-screen w-full bg-slate-100 ${FONT_SANS.className}`}>
      <ClientProvider>
        <ServerProvider>{children}</ServerProvider>
      </ClientProvider>
    </body>
  )
}
