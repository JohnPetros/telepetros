import type { ReactNode } from 'react'
import { ChatAvatar } from '../chatter-avatar'

type AvatarProps = {
  name: string
  avatar?: string
  isOnline?: boolean
  showOnlineState?: boolean
  children?: ReactNode
}

export const Info = ({
  name,
  avatar,
  isOnline = false,
  showOnlineState = false,
  children = null,
}: AvatarProps) => {
  return (
    <div className='flex items-center gap-3'>
      <ChatAvatar
        avatar={avatar}
        name={name}
        isOnline={isOnline}
        showOnlineState={showOnlineState}
        size='sm'
      />

      <div className='space-y-1'>
        <strong className='text-sm font-semibold'>{name}</strong>
        {children}
      </div>
    </div>
  )
}
