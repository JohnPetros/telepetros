import { Fira_Code as FontMono, Inter as FontSans } from 'next/font/google'

export const FONT_SANS = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const FONT_MONO = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
})
