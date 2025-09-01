import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns'

export function getWeekRange(currentDate: Date): { start: Date; end: Date } {
  const weekStartsOn = 1 // Monday
  return {
    start: startOfWeek(currentDate, { weekStartsOn }),
    end: endOfWeek(currentDate, { weekStartsOn }),
  }
}

export function getMonthRange(currentDate: Date): { start: Date; end: Date } {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)

  return {
    start: startOfWeek(monthStart, { weekStartsOn: 1 }),
    end: endOfWeek(monthEnd, { weekStartsOn: 1 }),
  }
}

export function snapToNearestQuarterHour(minutes: number): number {
  const quarterHour = 15;
  const remainder = minutes % quarterHour;
  if (remainder < quarterHour / 2) {
    return minutes - remainder;
  } else {
    return minutes + (quarterHour - remainder);
  }
}