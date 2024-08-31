import type { ReactNode } from 'react'
import { Avatar } from '@nextui-org/react'

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
    <div className='relative flex items-center gap-3'>
      {avatar && <Avatar src={avatar} size='sm' />}
      {!avatar && <Avatar name={name[0]} size='sm' />}
      {showOnlineState && (
        <div className='absolute bottom-0 left-6'>
          {isOnline ? (
            <span className='block size-3 bg-red-700 rounded-full' />
          ) : (
            <span className='block size-3 bg-green-700 rounded-full' />
          )}
        </div>
      )}
      <div className='space-y-1'>
        <strong className='text-sm font-semibold'>{name}</strong>
        {children}
      </div>
    </div>
  )
}
