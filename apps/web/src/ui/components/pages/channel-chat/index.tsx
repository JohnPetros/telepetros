'use client'

import type { ChannelDto, ChatDto } from '@telepetros/core/dtos'

import { useAuthContext } from '@/ui/contexts/auth-context'
import { useChannelChatPage } from './use-channel-chat-page'
import { Link } from '@nextui-org/react'
import { Icon } from '../../shared/icon'
import { Chat } from '../../shared/chat'
import { Header } from '../../shared/header'
import { ROUTES } from '@/ui/constants'

type ChannelChatPageProps = {
  initialData: {
    channel: ChannelDto
    chat: ChatDto
  }
}

export const ChannelChatPage = ({ initialData }: ChannelChatPageProps) => {
  const { channel, chat } = useChannelChatPage(initialData)
  const { chatter } = useAuthContext()

  if (!chatter || !channel) return null

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

      {chat && <Chat initialChat={chat} />}
    </div>
  )
}
