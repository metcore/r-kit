import type { CalendarDay, CalendarEvent, GetCalendarDaysProps } from '../type';

const getCalendarDays = ({
  currentYear,
  currentMonth,
}: GetCalendarDaysProps) => {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const prevLastDay = new Date(currentYear, currentMonth, 0);

  const firstDayOfWeek = firstDay.getDay();
  const lastDateOfMonth = lastDay.getDate();
  const prevLastDate = prevLastDay.getDate();

  const days = [];

  // Previous month's days
  for (let i = firstDayOfWeek; i > 0; i--) {
    days.push({
      date: prevLastDate - i + 1,
      month: 'prev',
      fullDate: new Date(currentYear, currentMonth - 1, prevLastDate - i + 1),
    });
  }

  // Current month's days
  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push({
      date: i,
      month: 'current',
      fullDate: new Date(currentYear, currentMonth, i),
    });
  }

  // Next month's days
  const remainingDays = 42 - days.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      month: 'next',
      fullDate: new Date(currentYear, currentMonth + 1, i),
    });
  }

  return days;
};

const isSameDate = (date1: CalendarDay, date2: CalendarDay) => {
  if (date1 == null || date2 == null) return false;
  return (
    date1.fullDate.getDate() === date2.fullDate.getDate() &&
    date1.fullDate.getMonth() === date2.fullDate.getMonth() &&
    date1.fullDate.getFullYear() === date2.fullDate.getFullYear()
  );
};

const isToday = (day: CalendarDay): boolean => {
  const today = new Date();
  return (
    day.fullDate.getDate() === today.getDate() &&
    day.fullDate.getMonth() === today.getMonth() &&
    day.fullDate.getFullYear() === today.getFullYear()
  );
};

function parseLocalDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function getWeekEventSegments({
  events,
  week,
}: {
  week: {
    fullDate: Date;
  }[];
  events: CalendarEvent[];
}) {
  const normalizedEvents = events.map((event) => ({
    ...event,
    start: parseLocalDate(event.startDate),
    end: parseLocalDate(event.endDate),
  }));

  const weekStartTs = week[0].fullDate.getTime();
  const weekEndTs = week[6].fullDate.getTime();

  const segments = [];

  for (const event of normalizedEvents) {
    const eventStartTs = event.start.getTime();
    const eventEndTs = event.end.getTime();

    // skip kalau gak overlap
    if (eventStartTs > weekEndTs || eventEndTs < weekStartTs) continue;

    const startIdx = week.findIndex(
      (d) => d.fullDate.getTime() === eventStartTs
    );

    const endIdx = week.findIndex((d) => d.fullDate.getTime() === eventEndTs);

    const startCol = startIdx === -1 ? 0 : startIdx;
    const endCol = endIdx === -1 ? 6 : endIdx;

    segments.push({
      event,
      startCol,
      span: endCol - startCol + 1,
    });
  }

  return segments;
}

export {
  getCalendarDays,
  isSameDate,
  isToday,
  getWeekEventSegments,
  parseLocalDate,
};
