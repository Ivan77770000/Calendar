export default class CalendarModel {
  year = 0;
  month = 0;
  dayOfMonth = 0;
  calendar = [];

  constructor(year, month, dayOfMonth, calendar) {
    this.year = year;
    this.month = month;
    this.dayOfMonth = dayOfMonth;
    this.calendar = calendar;
  }
}
