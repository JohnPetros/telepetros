'use client'

import { Avatar } from '@nextui-org/avatar'

import type { ChannelDto } from '@telepetros/core/dtos'
import { useChannelInfo } from './use-channel-info'
import { ChannelInfoForm } from './channel-info-form'

type ChannelInfoProps = {
  channelDto: ChannelDto
}

export const ChannelInfo = ({ channelDto }: ChannelInfoProps) => {
  const { channel } = useChannelInfo(channelDto)

  return (
    <div className='rounded-md overflow-hidden w-full'>
      <div className='bg-blue-500 w-full h-52' />
      <div className='flex items-center justify-between px-6 w-full bg-white'>
        <div className='w-full'>
          {channel.avatar ? (
            <Avatar
              src={channel.avatar}
              size='lg'
              classNames={{
                base: 'w-32 h-32 text-base ring-2 ring-white -translate-y-1/2',
              }}
            />
          ) : (
            <Avatar
              name={channel.name[0]}
              size='lg'
              classNames={{
                base: 'w-32 h-32 text-base ring-2 ring-white -translate-y-1/2',
                name: 'text-xl',
              }}
              color='primary'
            />
          )}
          <div className='-translate-y-1/2'>
            <h2 className='text-slate-800 text-2xl font-semibold'>{channel.name}</h2>
            <small className='block mt-1 text-base text-slate-500'>Channel</small>
          </div>
        </div>
        <ChannelInfoForm
          name={channel.name}
          inviteCode={channel.inviteCode}
          avatar={channel.avatar}
          banner={channel.banner}
        />
      </div>
    </div>
  )
}
