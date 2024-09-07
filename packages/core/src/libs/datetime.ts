import dayjs from 'dayjs'

import type { IDatetime } from '../interfaces/libs'
import type { DateFormat } from '../types/date-format'

export class DayjsDatetime implements IDatetime {
  format(date: Date, dateFormat: DateFormat): string {
    return dayjs(date).format(dateFormat)
  }
}
