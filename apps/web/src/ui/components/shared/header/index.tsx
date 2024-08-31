import type { ReactNode } from 'react'

import { Avatar } from '@nextui-org/react'

type ChannelChatPageProps = {
  children: ReactNode
}

export const Header = ({ children }: ChannelChatPageProps) => {
  return (
    <>
      <header className='flex items-center justify-between bg-white px-6 py-3'>
        {children}
      </header>
    </>
  )
}
