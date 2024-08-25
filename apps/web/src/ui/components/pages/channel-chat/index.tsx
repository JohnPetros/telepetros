'use client'

import { useAuthContext } from '@/ui/contexts/auth-context'
import { useChannelChatPage } from './use-channel-chat-page'
import { Button, Input, Link } from '@nextui-org/react'
import { Icon } from '../../shared/icon'
import { Chat } from '../../shared/chat'
import { Header } from '../../shared/header'
import { ChatMessage } from '../../shared/chat/chat-message'
import { ROUTES } from '@/ui/constants'

type ChannelChatPageProps = {
  channelId: string
}

export const ChannelChatPage = ({ channelId }: ChannelChatPageProps) => {
  const { channel, chat } = useChannelChatPage(channelId)
  const { chatter } = useAuthContext()

  if (!chatter || !channel) return null

  return (
    <div className='flex flex-col h-full'>
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
