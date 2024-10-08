import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { FONT_SANS } from '@/ui/constants/fonts'
import { RootLayout } from '@/ui/components/layouts/root'
import '@/ui/styles/global.css'

export const metadata: Metadata = {
  title: 'Telepetros',
  description: 'Generated by create next app',
}

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang='en' className={`light ${FONT_SANS.className}`}>
      <RootLayout>{children}</RootLayout>
    </html>
  )
}

export default Layout
