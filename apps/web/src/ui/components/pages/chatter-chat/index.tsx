'use client'

import type { ChatDto, ChatterDto } from '@telepetros/core/dtos'

import { Link } from '@nextui-org/react'
import { ROUTES } from '@/ui/constants'
import { Icon } from '../../shared/icon'
import { Chat } from '../../shared/chat'
import { Header } from '../../shared/header'
import { useChatterChatPage } from './use-chatter-chat'

type ChannelChatPageProps = {
  chatDto: ChatDto
  chatterDto: ChatterDto
}

export const ChatterChatPage = ({ chatDto, chatterDto }: ChannelChatPageProps) => {
  const { chatter, chat } = useChatterChatPage(chatDto, chatterDto)

  if (!chatter || !chat) return null

  return (
    <div className='flex flex-col h-screen'>
      <Header
        resource={{ name: chatter.name, avatar: chatter.avatar }}
        link={
          <Link href={`${ROUTES.channel}/${chatter.id}`}>
            <Icon name='gear' size={24} className='text-slate-700' />
          </Link>
        }
      />

      {chat && (
        <Chat initialChat={chat}>
          {() => (
            <div>
              <h1 className='text-2xl text-slate-700 font-semibold'>Chat</h1>
            </div>
          )}
        </Chat>
      )}
    </div>
  )
}
