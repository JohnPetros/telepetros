'use client'

import type { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { FONT_SANS } from '@/ui/constants/fonts'
import { useRouter } from 'next/navigation'

type RootLayoutProps = { children: ReactNode }

export function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter()

  return (
    <body className={`min-h-screen w-full bg-slate-200 ${FONT_SANS.className}`}>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </body>
  )
}
