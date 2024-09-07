import type { DateFormat } from '../../types/date-format'

export interface IDatetime {
  format(date: Date, dateFormat: DateFormat): string
}
