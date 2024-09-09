'use client'

import Link from 'next/link'

import type { ChatDto } from '@telepetros/core/dtos'

import { ROUTES } from '@/ui/constants'
import { useAuthContext } from '@/ui/contexts/auth-context'
import { Chat } from '../../shared/chat'
import { Header } from '../../shared/header'
import { ChatAvatar } from '../../shared/chatter-avatar'
import { Icon } from '../../shared/icon'

type ChannelChatPageProps = {
  channelId: string
  chatDto: ChatDto
}

export const ChannelChatPage = ({ chatDto, channelId }: ChannelChatPageProps) => {
  const { authChatter } = useAuthContext()

  return (
    <>
      <Header>
        <div className='flex items-center gap-3'>
          <ChatAvatar
            avatar={authChatter.avatar}
            name={authChatter.name}
            showOnlineState={false}
          />
          <h2>{authChatter.name}</h2>
        </div>
        <Link href={`${ROUTES.channel}/${channelId}/settings`}>
          <Icon name='gear' size={24} className='text-slate-700' />
        </Link>
      </Header>
      {chatDto && (
        <Chat chatDto={chatDto}>
          {(chat) => (
            <div>
              <h1 className='text-2xl text-slate-700 font-semibold'>Channel Chat</h1>
              <p className='mt-1 text-md text-slate-400'>
                {chat.chattersCount} members, {chat.onlineChattersCount} online
              </p>
            </div>
          )}
        </Chat>
      )}
    </>
  )
}
