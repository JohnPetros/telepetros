type DateFormat = 'hh:mm'

export interface IDatetime {
  format(date: Date, format: DateFormat): string
}
