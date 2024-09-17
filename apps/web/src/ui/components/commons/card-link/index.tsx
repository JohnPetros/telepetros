import { Link, Card, CardBody, Avatar } from '@nextui-org/react'
import type { IconName } from '../icon/types'
import { Icon } from '../icon'

type CardLinkProps = {
  route: string
  title: string
  icon?: IconName
  avatar?: string
  isActive?: boolean
  payload?: unknown
}

export const CardLink = ({
  route,
  title,
  avatar,
  icon,
  isActive = false,
}: CardLinkProps) => {
  console.log({ avatar })
  return (
    <Card
      as={Link}
      href={route}
      shadow='sm'
      isHoverable
      isPressable
      fullWidth
      data-hover={isActive ? 'true' : 'false'}
    >
      <CardBody>
        <div className='flex gap-3 items-center w-full'>
          {avatar && !icon && <Avatar src={avatar} size='sm' />}
          {!icon && !avatar && <Avatar name={title[0]} size='sm' />}
          {icon && (
            <div className='grid place-content-center bg-blue-700 rounded-full'>
              <Icon name={icon} size={24} />
            </div>
          )}
          <strong className='text-sm font-semibold'>{title}</strong>
        </div>
      </CardBody>
    </Card>
  )
}
