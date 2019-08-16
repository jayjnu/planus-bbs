export interface IEvent {
  dateYMD: string;
}

export interface ICalendar {
  start_datetime: string;
  end_datetime: string;
  events: IEvent[];
}
