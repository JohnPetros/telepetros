'use client'

import type { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { FONT_SANS } from '@/ui/constants/fonts'

type RootLayoutProps = { children: ReactNode }

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <body className={`min-h-screen w-full bg-slate-200 ${FONT_SANS.className}`}>
      <NextUIProvider>{children}</NextUIProvider>
    </body>
  )
}
