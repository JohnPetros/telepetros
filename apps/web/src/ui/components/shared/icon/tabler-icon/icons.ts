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
  IconCornerDownLeft,
  IconCopy,
  IconDots,
  IconX,
  IconCheck,
  IconEdit,
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
  close: IconX,
  check: IconCheck,
  emoticon: IconMoodSmile,
  at: IconAt,
  copy: IconCopy,
  ellipsis: IconDots,
  reply: IconCornerDownLeft,
  edit: IconEdit,
  trash: IconTrash,
}
