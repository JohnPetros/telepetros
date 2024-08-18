import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import type { IconName } from '../types'
import { type Icon, IconBrandGithub, type IconProps } from '@tabler/icons-react'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
> = {
  github: IconBrandGithub,
}
