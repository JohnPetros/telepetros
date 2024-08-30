'use client'

import type { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type ClientProviderProps = { children: ReactNode }

export function ClientProvider({ children }: ClientProviderProps) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <Toaster position='top-center' reverseOrder={false} />
      {children}
    </NextUIProvider>
  )
}
