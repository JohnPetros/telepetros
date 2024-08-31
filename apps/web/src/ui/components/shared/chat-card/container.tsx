import type { ReactNode } from 'react'
import { Button, Card, CardBody, type CardProps, Link } from '@nextui-org/react'

type ContainerProps = {
  children: ReactNode
  isActive?: boolean
  as?: 'link' | 'button'
  className?: string
} & CardProps

export const Container = ({
  children,
  className,
  isActive = false,
  as = 'link',
}: ContainerProps) => {
  return (
    <Card
      as={as === 'link' ? Link : Button}
      shadow='sm'
      isHoverable
      isPressable
      fullWidth
      className={className}
      data-hover={isActive ? 'true' : 'false'}
    >
      <CardBody className='w-full'>{children}</CardBody>
    </Card>
  )
}
