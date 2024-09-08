import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import type { IDatetime } from '../interfaces/libs'
import type { DateFormat } from '../types/date-format'

dayjs.extend(utc)

export class DayjsDatetime implements IDatetime {
  format(date: Date, dateFormat: DateFormat): string {
    const utcDate = dayjs.utc(date)
    return utcDate.format(dateFormat)
  }
}
