import type { ReactNode } from 'react'

import { Avatar, Link } from '@nextui-org/react'
import { Icon } from '../../shared/icon'

type ChannelChatPageProps = {
  resource: {
    name: string
    avatar: string
  }
  link: ReactNode
}

export const Header = ({ resource, link }: ChannelChatPageProps) => {
  return (
    <>
      <header className='flex items-center justify-between bg-white px-6 py-3'>
        <div className='flex items-center gap-3'>
          {resource.avatar ? (
            <Avatar src={resource.avatar} size='sm' />
          ) : (
            <Avatar name={resource.name[0]} size='sm' />
          )}
          <h2>{resource.name}</h2>
        </div>
        {link}
      </header>
    </>
  )
}
