'use client'

import Link from 'next/link'

import { useAuthContext } from '@/ui/contexts/auth-context'
import { ROUTES } from '@/ui/constants'
import { Header } from '@/ui/components/commons/header'
import { ChatAvatar } from '@/ui/components/commons/chatter-avatar'
import { Icon } from '@/ui/components/commons/icon'

type ChannelHeaderProps = {
  channelId: string
}

export const ChannelHeader = ({ channelId }: ChannelHeaderProps) => {
  const { authChatter } = useAuthContext()

  return (
    <Header>
      <div className='flex items-center gap-3'>
        <ChatAvatar
          avatar={authChatter.avatar}
          name={authChatter.name}
          showOnlineState={false}
        />
        <h2>{authChatter.name}</h2>
      </div>
      <Link href={`${ROUTES.channel}/${channelId}/chat`}>
        <Icon name='close' size={24} className='text-slate-700' />
      </Link>
    </Header>
  )
}
