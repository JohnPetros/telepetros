import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import {
  type Icon,
  type IconProps,
  IconBrandGithub,
  IconSettings,
  IconPlus,
  IconCornerDownRight,
  IconPaperclip,
  IconMoodSmile,
  IconImageInPicture,
} from '@tabler/icons-react'

import type { IconName } from '../types'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
> = {
  'arrow-right-corner': IconCornerDownRight,
  image: IconImageInPicture,
  github: IconBrandGithub,
  plus: IconPlus,
  gear: IconSettings,
  clip: IconPaperclip,
  emote: IconMoodSmile,
}
