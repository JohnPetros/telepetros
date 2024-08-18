import type { IconProps } from '../types'
import { ICONS } from './icons'

export const TablerIcon = ({ name, size }: IconProps) => {
  const Icon = ICONS[name]

  return <Icon size={size} />
}
