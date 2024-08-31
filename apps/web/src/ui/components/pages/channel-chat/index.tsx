'use client'

import type { ChannelDto, ChatDto } from '@telepetros/core/dtos'

import { useAuthContext } from '@/ui/contexts/auth-context'
import { useChannelChatPage } from './use-channel-chat-page'
import { Link } from '@nextui-org/react'
import { Icon } from '../../shared/icon'
import { Chat } from '../../shared/chat'
import { Header } from '../../shared/header'
import { ROUTES } from '@/ui/constants'
import { ChatAvatar } from '../../shared/chatter-avatar'

type ChannelChatPageProps = {
  initialData: {
    channel: ChannelDto
    chat: ChatDto
  }
}

export const ChannelChatPage = ({ initialData }: ChannelChatPageProps) => {
  const { channel, chat } = useChannelChatPage(initialData)

  if (!channel) return null

  return (
    <div className='flex flex-col h-screen'>
      <Header>
        <div className='flex items-center gap-3'>
          <ChatAvatar avatar={channel.avatar} name={channel.name} />
          <h2>{channel.name}</h2>
        </div>
        <Link href={`${ROUTES.channel}/${channel.id}`}>
          <Icon name='gear' size={24} className='text-slate-700' />
        </Link>
      </Header>

      {chat && (
        <Chat initialChat={chat}>
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
    </div>
  )
}
