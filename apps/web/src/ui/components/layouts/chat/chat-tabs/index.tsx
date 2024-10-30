'use client'

import { useRef } from 'react'
import { Tabs, Tab, Button } from '@nextui-org/react'

import type { PopoverRef } from '@/ui/components/commons/popover/types'
import { CardLink } from '@/ui/components/commons/card-link'
import { Icon } from '@/ui/components/commons/icon'
import { Popover } from '@/ui/components/commons/popover'
import { CreateChannelModal } from './create-channel-modal'
import { useChatTabs } from './use-chat-tabs'
import { JoinChannelModal } from './join-channel-modal'
import { FindChatterModal } from './find-chatter-modal'
import { ChatCard } from '@/ui/components/commons/chat-card'
import { ROUTES } from '@/ui/constants'

export const ChatTabs = () => {
  const popoverRef = useRef<PopoverRef>(null)
  const {
    channels,
    chatters,
    selectedTab,
    handleTabChange,
    handleCreateChannel,
    handleFindChatter,
    handleJoinChannel,
  } = useChatTabs(popoverRef)

  return (
    <div className='flex flex-wrap gap-4 w-full'>
      <Tabs
        selectedKey={selectedTab}
        color='primary'
        aria-label='Tabs colors'
        radius='full'
        onSelectionChange={(key) => handleTabChange(key.toString())}
        fullWidth
      >
        <Tab key='channels' title='Channels' className='w-full'>
          <Popover
            ref={popoverRef}
            trigger={
              <Button
                startContent={<Icon name='plus' size={24} />}
                fullWidth
                className='bg-slate-200 text-slate-600'
              >
                Channel
              </Button>
            }
          >
            <CreateChannelModal onCreate={handleCreateChannel}>
              <Button
                fullWidth
                color='primary'
                className='bg-transparent text-slate-700 hover:bg-blue-500 hover:text-gray-50'
              >
                Create channel
              </Button>
            </CreateChannelModal>
            <JoinChannelModal onJoin={handleJoinChannel}>
              <Button
                fullWidth
                color='primary'
                className='mt-1 bg-transparent text-slate-700 hover:bg-blue-500 hover:text-gray-50'
              >
                Join to a channel
              </Button>
            </JoinChannelModal>
          </Popover>
          <ul>
            {channels?.map((channel) => (
              <li key={channel.id} className='mt-3'>
                <ChatCard.Container
                  as='link'
                  href={`${ROUTES.channel}/${channel.id}/chat`}
                >
                  <ChatCard.Info
                    name={channel.name}
                    avatar={channel.avatar}
                    showOnlineState={false}
                  />
                </ChatCard.Container>
              </li>
            ))}
          </ul>
        </Tab>
        <Tab key='chatters' title='Chatters' className='w-full'>
          <FindChatterModal onFind={handleFindChatter}>
            <Button
              startContent={<Icon name='plus' size={24} />}
              fullWidth
              className='bg-slate-200 text-slate-600'
            >
              Chatter
            </Button>
          </FindChatterModal>
          {chatters && (
            <ul className='mt-3'>
              {chatters?.map((chatter) => (
                <li key={chatter.id}>
                  <ChatCard.Container
                    as='link'
                    href={`${ROUTES.chatter}/${chatter.id}/chat`}
                  >
                    <ChatCard.Info
                      name={chatter.name}
                      avatar={chatter.avatar}
                      isOnline={chatter.isOnline}
                      showOnlineState={true}
                    />
                  </ChatCard.Container>
                </li>
              ))}
            </ul>
          )}
        </Tab>
      </Tabs>
    </div>
  )
}
