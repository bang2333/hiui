
export type DateRange = {
  start: Date | string | number | undefined | null
  end: Date | string | number | undefined | null
}
type DateRangeString = {
  start: string
  end: string
}
type CalendarItem = {
  date?: Date | string
  text?: string
  highlight?: boolean
}
export interface CommonProps {
  value?: Date | string | number | DateRange | undefined | null
  defaultValue?: Date | string | number | DateRange | undefined | null
  disabled?: boolean
  clearable?: boolean
  placeholder?: string | string[]
  format?: string
  onChange?: (date: Date | DateRange, dateStr: string | DateRangeString) => void
}
type Shortcuts = {
  title: string
  range: Date[] | number[]
}

interface DateProps extends CommonProps {
  type?: 'date' | 'daterange' | 'year' | 'month' | 'week' | 'weekrange' | 'timeperiod' | 'yearrange' | 'monthrange'
  min?: Date
  minDate?: Date
  max?: Date
  maxDate?: Date
  disabledDate?: (currentDate: Date) => boolean
  showTime?: boolean
  shortcuts?: string[] | Shortcuts[]
  weekOffset?: 0 | 1
  altCalendar?: CalendarItem
  altCalendarPreset?: 'zh-CN' | 'id-ID'
  dateMarkRender?: (currentDate: Date, today: Date) => JSX.Element
  dateMarkPreset?: 'zh-CN'
  overlayClassName?: string
}

declare const DatePicker: React.ComponentType<DateProps>
export default DatePicker
