'use client'

import type { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'

type RootLayoutProps = { children: ReactNode }

export function RootLayout({ children }: RootLayoutProps) {
  return <NextUIProvider>{children}</NextUIProvider>
}
