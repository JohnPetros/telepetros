import { useAuthContext } from '@/ui/contexts/auth-context'
import { ChatMessage } from '../../shared/chat-message'
import { useChannelChatPage } from './use-channel-chat-page'
import { Avatar, Link } from '@nextui-org/react'
import { Icon } from '../../shared/icon'

type ChannelChatPageProps = {
  channelId: string
}

export const ChannelChatPage = ({ channelId }: ChannelChatPageProps) => {
  const { channel } = useChannelChatPage(channelId)
  const { chatter } = useAuthContext()

  if (!chatter || !channel) return null

  return (
    <>
      <header className='flex items-center justify-between bg-white'>
        <div className='flex items-center gap-3'>
          {channel.avatar ? (
            <Avatar src={chatter.avatar} />
          ) : (
            <Avatar name={chatter.name} />
          )}
          <h2>EITA</h2>
        </div>
        <Link>
          <Icon name='gear' size={24} />
        </Link>
      </header>

      <div>
        <h1 className='text-3xl text-slate-700'>Channel Chat</h1>
        <p className='text-lg text-slate-400'>23 members, 10 online</p>
      </div>

      <div>
        <ChatMessage chatter={{ name: chatter.name, avatar: chatter.avatar }} />
      </div>
    </>
  )
}
