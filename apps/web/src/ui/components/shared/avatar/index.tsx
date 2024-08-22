import { Avatar } from '@nextui-org/react'

type AvatarProps = {
  image?: string
  name?: string
}

export const AvatarComponent = ({ image, name }: AvatarProps) => {
  if (name) return <Avatar name={image} size='sm' />
}

export { AvatarComponent as Avatar }
