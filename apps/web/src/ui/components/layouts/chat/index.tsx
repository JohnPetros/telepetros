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
    <div>
      <aside className='fixed top-0 bottom-0 z-50 flex flex-col bg-slate-50 border-r-1 border-r-slate-300 p-3 h-screen w-72'>
        <CardLink route={ROUTES.home} title='Home' isActive />
        <div className='mt-6'>
          <ChatTabs />
        </div>
        <div className='flex-1 flex items-end'>
          <Chatter />
        </div>
      </aside>
      <main className='w-full pl-72'>{children}</main>
    </div>
  )
}
