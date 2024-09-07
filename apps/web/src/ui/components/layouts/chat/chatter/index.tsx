'use client'

import { Icon } from '@/ui/components/shared/icon'
import { useAuthContext } from '@/ui/contexts/auth-context'
import { Avatar, Link } from '@nextui-org/react'

export const Chatter = () => {
  const { authChatter } = useAuthContext()

  if (authChatter)
    return (
      <Link href='/me' className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Avatar src={authChatter.avatar} size='sm' />
          <div className='w-40'>
            <strong className='block text-sm text-slate-900 truncate'>
              {authChatter.name}
            </strong>
            <small className='mt-1 text-slate-500'>View profile</small>
          </div>
        </div>
        <Icon name='arrow-right-corner' size={24} className='text-slate-500' />
      </Link>
    )
}
