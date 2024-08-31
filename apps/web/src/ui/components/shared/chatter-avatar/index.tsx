import { Avatar } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

type ChatAvatarProps = {
  name: string
  avatar?: string
  isOnline?: boolean
  showOnlineState?: boolean
  size?: 'sm' | 'lg'
}

export const ChatAvatar = ({
  name,
  avatar,
  size = 'sm',
  isOnline = false,
  showOnlineState = true,
}: ChatAvatarProps) => {
  return (
    <div className='relative'>
      {avatar && <Avatar src={avatar} size={size} />}
      {!avatar && <Avatar name={name[0]} size={size} />}
      {showOnlineState && (
        <div
          className={twMerge('absolute bottom-0', size === 'sm' ? 'left-6' : 'left-10')}
        >
          {isOnline ? (
            <span
              className={twMerge(
                'block bg-red-700 rounded-full',
                size === 'sm' ? 'size-3' : 'size-6',
              )}
            />
          ) : (
            <span
              className={twMerge(
                'block bg-green-700 rounded-full',
                size === 'sm' ? 'size-3' : 'size-6',
              )}
            />
          )}
        </div>
      )}
    </div>
  )
}
