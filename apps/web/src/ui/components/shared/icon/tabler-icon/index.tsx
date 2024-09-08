import type { IconProps } from '../types'
import { ICONS } from './icons'

export const TablerIcon = ({ name, size = 24, className }: IconProps) => {
  const Icon = ICONS[name]

  return <Icon size={size} className={className} />
}
