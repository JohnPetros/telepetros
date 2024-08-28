import dayjs from 'dayjs'

import type { IDatetime } from '../interfaces/libs'

export class DayjsDatetime implements IDatetime {
  format(date: Date, format: 'hh:mm'): string {
    return dayjs(date).format(format)
  }
}
