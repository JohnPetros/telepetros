'use client'

import type { ChatDto, ChatterDto } from '@telepetros/core/dtos'

import { Link } from '@nextui-org/react'
import { ROUTES } from '@/ui/constants'
import { Icon } from '../../commons/icon'
import { Chat } from '../../commons/chat'
import { Header } from '../../commons/header'
import { useChatterChatPage } from './use-chatter-chat'
import { ChatAvatar } from '../../commons/chatter-avatar'

type ChannelChatPageProps = {
  chatDto: ChatDto
  chatterDto: ChatterDto
}

export const ChatterChatPage = ({ chatDto, chatterDto }: ChannelChatPageProps) => {
  const { chatter, chat } = useChatterChatPage(chatDto, chatterDto)

  if (!chatter || !chat) return null

  return (
    <div className='flex flex-col h-screen'>
      <Header>
        <div className='flex items-center gap-3'>
          <ChatAvatar
            avatar={chatter.avatar}
            name={chatter.name}
            isOnline={chatter.isOnline}
            showOnlineState
          />
          <h2>{chatter.name}</h2>
        </div>
        <Link href={`${ROUTES.channel}/${chatter.id}`}>
          <Icon name='gear' size={24} className='text-slate-700' />
        </Link>
      </Header>

      {/* {chat && (
        <Chat chatDto={chat}>
          {() => (
            <div>
              <h1 className='text-2xl text-slate-700 font-semibold'>Chat</h1>
            </div>
          )}
        </Chat>
      )} */}
    </div>
  )
}
