'use client'

import { Tabs, Tab, Button } from '@nextui-org/react'
import { useChatTabs } from './use-chat-tabs'
import { CardLink } from '@/ui/components/shared/card-link'
import { Icon } from '@/ui/components/shared/icon'
import { Popover } from '@/ui/components/shared/popover'
import { CreateChannelModal } from './create-channel-modal'

export const ChatTabs = () => {
  const { channels, selectedTab, handleTabChange, handleCreateChannel } = useChatTabs()

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
                <CardLink route={''} title='Channel 1' />
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
            Chatte
          </Button>
          <ul className='mt-3'>
            <li>
              <CardLink
                title='Channel 1'
                avatar='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
                route={''}
              />
            </li>
            <li>
              <CardLink
                title='Channel 2'
                avatar='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
                route={''}
              />
            </li>
          </ul>
        </Tab>
      </Tabs>
    </div>
  )
}
