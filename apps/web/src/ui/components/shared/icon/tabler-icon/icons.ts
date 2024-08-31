import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import {
  type Icon,
  type IconProps,
  IconBrandGithub,
  IconBrandGoogle,
  IconSettings,
  IconPlus,
  IconCornerDownRight,
  IconPaperclip,
  IconMoodSmile,
  IconImageInPicture,
  IconTrash,
  IconAt,
} from '@tabler/icons-react'

import type { IconName } from '../types'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
> = {
  'arrow-right-corner': IconCornerDownRight,
  image: IconImageInPicture,
  github: IconBrandGithub,
  google: IconBrandGoogle,
  plus: IconPlus,
  gear: IconSettings,
  clip: IconPaperclip,
  emoticon: IconMoodSmile,
  at: IconAt,
  trash: IconTrash,
}
