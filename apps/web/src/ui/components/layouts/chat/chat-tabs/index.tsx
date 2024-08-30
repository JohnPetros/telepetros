'use client'

import { useRef } from 'react'
import { Tabs, Tab, Button } from '@nextui-org/react'

import type { PopoverRef } from '@/ui/components/shared/popover/types'
import { CardLink } from '@/ui/components/shared/card-link'
import { Icon } from '@/ui/components/shared/icon'
import { Popover } from '@/ui/components/shared/popover'
import { CreateChannelModal } from './create-channel-modal'
import { useChatTabs } from './use-chat-tabs'

export const ChatTabs = () => {
  const popoverRef = useRef<PopoverRef>(null)
  const { channels, chatters, selectedTab, handleTabChange, handleCreateChannel } =
    useChatTabs(popoverRef)

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
            <Button
              fullWidth
              color='primary'
              className='mt-1 bg-transparent text-slate-700 hover:bg-blue-500 hover:text-gray-50'
            >
              Join to a channel
            </Button>
          </Popover>
          <ul>
            {channels?.map((channel) => (
              <li key={channel.id} className='mt-3'>
                <CardLink title={channel.name} route={`channel/${channel.id}/chat`} />
              </li>
            ))}
          </ul>
        </Tab>
        <Tab key='chatters' title='Chatters' className='w-full'>
          <Button
            startContent={<Icon name='plus' size={24} />}
            fullWidth
            className='bg-slate-200 text-slate-600'
          >
            Chatter
          </Button>
          {chatters && (
            <ul className='mt-3'>
              {chatters?.map((chatter) => (
                <li key={chatter.id}>
                  <CardLink
                    title={chatter.name}
                    avatar={chatter.avatar}
                    route={`chatter/${chatter.id}/chat`}
                  />
                </li>
              ))}
            </ul>
          )}
        </Tab>
      </Tabs>
    </div>
  )
}
