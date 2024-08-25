import type { ReactNode } from 'react'
import { ChatTabs } from './chat-tabs'
import { CardLink } from '../../shared/card-link'
import { ROUTES } from '@/ui/constants'
import { Chatter } from './chatter'

type ChatLayoutProps = {
  children: ReactNode
}

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className='grid grid-cols-[16rem_1fr]'>
      <aside className='flex flex-col bg-slate-50 border-r-1 border-r-slate-300 p-3 h-screen'>
        <CardLink route={ROUTES.home} title='Home' isActive />
        <div className='mt-6'>
          <ChatTabs />
        </div>
        <div className='flex-1 flex items-end'>
          <Chatter />
        </div>
      </aside>
      <main>{children}</main>
    </div>
  )
}
