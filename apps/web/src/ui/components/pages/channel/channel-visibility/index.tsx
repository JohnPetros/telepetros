'use client'

import { Button, Input, Switch } from '@nextui-org/react'

import { useChannelVisibility } from './use-channel-visibility'
import { Icon } from '@/ui/components/shared/icon'

type ChannelVisibilityProps = {
  defaultVisibility: boolean
  channelId: string
  inviteCode: string
}

export const ChannelVisibility = ({
  defaultVisibility,
  channelId,
  inviteCode,
}: ChannelVisibilityProps) => {
  const {
    isChannelPublic,
    isCoping,
    isSwitching,
    handleSwitchChange,
    handleInviteCodeCopyClick,
  } = useChannelVisibility(defaultVisibility, channelId)

  return (
    <div>
      <div className='flex justify-between'>
        <h3 className='font-semibold text-slate-800'>Visibility</h3>
        <Switch
          defaultSelected={defaultVisibility}
          isSelected={isChannelPublic}
          onValueChange={handleSwitchChange}
          disabled={isSwitching}
          aria-label={
            isChannelPublic ? 'channel is public now' : 'channel is not public now'
          }
        />
      </div>
      <div>
        {isChannelPublic && (
          <p className='text-sm text-slate-700'>
            Everyone can join this channel using the invite code below.
          </p>
        )}
        <div className='flex items-center gap-3 mt-3'>
          <Input
            value={isChannelPublic ? inviteCode : 'public invite is disabled'}
            classNames={{
              inputWrapper: 'border border-slate-300 p-6',
            }}
            className={isChannelPublic ? 'opacity-1' : 'opacity-50 pointer-events-none'}
            readOnly
            disabled={!isChannelPublic}
          />
          <Button
            isIconOnly
            onClick={() => handleInviteCodeCopyClick(inviteCode)}
            className='bg-slate-200 text-slate-500'
          >
            <Icon name={isCoping ? 'check' : 'copy'} size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
