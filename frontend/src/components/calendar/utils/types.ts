export interface CalendarOptions {
  view: CalendarView,

  callbacks?: {
    onCreateEvent?: (start: Date, end: Date) => void;
  }
}

export interface CalendarRange {
  start: Date;
  end: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;

  start: Date;
  end: Date;

  color?: string;
}

export enum CalendarView {
  WEEK = 'week',
  MONTH = 'month',
}