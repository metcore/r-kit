import type {
  CalendarDay,
  CalendarEvent,
  GetCalendarDaysProps,
  TimedEventLayout,
} from '../type';

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

function toDateOnly(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
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

  const weekStartTs = toDateOnly(week[0].fullDate);
  const weekEndTs = toDateOnly(week[6].fullDate);

  const segments = [];

  for (const event of normalizedEvents) {
    const eventStartTs = toDateOnly(event.start);
    const eventEndTs = toDateOnly(event.end);

    if (eventStartTs > weekEndTs || eventEndTs < weekStartTs) continue;

    const clampedStartTs = Math.max(eventStartTs, weekStartTs);
    const clampedEndTs = Math.min(eventEndTs, weekEndTs);

    if (clampedStartTs > clampedEndTs) continue;

    const startCol = week.findIndex(
      (d) => toDateOnly(d.fullDate) === clampedStartTs
    );
    const endCol = week.findIndex(
      (d) => toDateOnly(d.fullDate) === clampedEndTs
    );

    const resolvedStartCol = startCol === -1 ? 0 : startCol;
    const resolvedEndCol = endCol === -1 ? 6 : endCol;

    segments.push({
      event,
      startCol: resolvedStartCol,
      span: resolvedEndCol - resolvedStartCol + 1,
    });
  }

  return segments;
}

type EventSegment = { event: CalendarEvent; startCol: number; span: number };
type PackedEventSegment = EventSegment & { level: number };

function packEventSegments({
  segments,
  threshold,
}: {
  segments: EventSegment[];
  threshold: number;
}) {
  const sortedSegments = [...segments].sort(
    (a, b) => a.startCol - b.startCol || b.span - a.span
  );

  const segmentLevels = new Map<EventSegment, number>();

  sortedSegments.forEach((seg) => {
    let placed = false;

    for (let level = 0; level < threshold; level++) {
      const conflict = sortedSegments.some((other) => {
        if (other === seg) return false;

        const otherLevel = segmentLevels.get(other);
        if (otherLevel !== level) return false;

        const segStart = seg.startCol;
        const segEnd = seg.startCol + seg.span - 1;

        const otherStart = other.startCol;
        const otherEnd = other.startCol + other.span - 1;

        return !(segEnd < otherStart || segStart > otherEnd);
      });

      if (!conflict) {
        segmentLevels.set(seg, level);
        placed = true;
        break;
      }
    }

    if (!placed) {
      segmentLevels.set(seg, threshold);
    }
  });

  const columnLevelOccupied = Array.from(
    { length: 7 },
    () => new Array(threshold).fill(false) as boolean[]
  );

  segments.forEach((seg) => {
    const level = segmentLevels.get(seg) ?? 0;
    if (level < threshold) {
      for (let i = 0; i < seg.span; i++) {
        const col = seg.startCol + i;
        if (col >= 0 && col < 7) columnLevelOccupied[col][level] = true;
      }
    }
  });

  const renderSegments: PackedEventSegment[] = [];

  segments.forEach((seg) => {
    const level = segmentLevels.get(seg) ?? 0;
    if (level < threshold) renderSegments.push({ ...seg, level });
  });

  sortedSegments.forEach((seg) => {
    if ((segmentLevels.get(seg) ?? 0) < threshold) return;

    const segEnd = Math.min(seg.startCol + seg.span - 1, 6);

    let runStart = -1;
    let runLevel = -1;

    const flushRun = (endExclusive: number) => {
      if (runStart !== -1) {
        renderSegments.push({
          event: seg.event,
          startCol: runStart,
          span: endExclusive - runStart,
          level: runLevel,
        });
      }
      runStart = -1;
      runLevel = -1;
    };

    const pickLevel = (col: number): number => {
      let bestLevel = -1;
      let bestRun = 0;
      for (let l = 0; l < threshold; l++) {
        if (columnLevelOccupied[col][l] !== false) continue;
        let run = 0;
        for (let c = col; c <= segEnd; c++) {
          if (columnLevelOccupied[c][l] !== false) break;
          run++;
        }
        if (run > bestRun) {
          bestRun = run;
          bestLevel = l;
        }
      }
      return bestLevel;
    };

    for (let i = 0; i < seg.span; i++) {
      const col = seg.startCol + i;
      if (col < 0 || col >= 7) {
        flushRun(col);
        continue;
      }

      if (runLevel !== -1) {
        if (columnLevelOccupied[col][runLevel] === false) {
          columnLevelOccupied[col][runLevel] = true;
        } else {
          flushRun(col);
          const availableLevel = pickLevel(col);
          if (availableLevel !== -1) {
            runStart = col;
            runLevel = availableLevel;
            columnLevelOccupied[col][availableLevel] = true;
          }
        }
      } else {
        const availableLevel = pickLevel(col);
        if (availableLevel !== -1) {
          runStart = col;
          runLevel = availableLevel;
          columnLevelOccupied[col][availableLevel] = true;
        }
      }
    }
    flushRun(seg.startCol + seg.span);
  });

  const columnHiddenSegments: EventSegment[][] = Array.from(
    { length: 7 },
    () => []
  );

  segments.forEach((seg) => {
    if ((segmentLevels.get(seg) ?? 0) < threshold) return;
    for (let i = 0; i < seg.span; i++) {
      const col = seg.startCol + i;
      if (col < 0 || col >= 7) continue;
      const rendered = renderSegments.some(
        (rs) =>
          rs.event === seg.event &&
          rs.startCol <= col &&
          col < rs.startCol + rs.span
      );
      if (!rendered) columnHiddenSegments[col].push(seg);
    }
  });

  const columnMoreCount = columnHiddenSegments.map((segs) => segs.length);

  const allSegments: PackedEventSegment[] = segments.map((seg) => ({
    ...seg,
    level: segmentLevels.get(seg) ?? 0,
  }));

  return { renderSegments, columnHiddenSegments, columnMoreCount, allSegments };
}

function getWeekDays(weekStart: Date): CalendarDay[] {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return {
      date: date.getDate(),
      month: 'current',
      fullDate: date,
    };
  });
}

function isTimedEvent(event: CalendarEvent): boolean {
  return (
    event.startDate === event.endDate &&
    event.startDateTime != null &&
    event.endDateTime != null
  );
}

function isSameLocalDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getTimedEventLayouts({
  weekDays,
  events,
}: {
  weekDays: CalendarDay[];
  events: CalendarEvent[];
}): TimedEventLayout[] {
  const results: TimedEventLayout[] = [];

  weekDays.forEach((day, dayIndex) => {
    const dayEvents = events.filter((event) =>
      event.startDateTime != null
        ? isSameLocalDay(event.startDateTime, day.fullDate)
        : false
    );

    const sorted = [...dayEvents].sort(
      (a, b) => a.startDateTime!.getTime() - b.startDateTime!.getTime()
    );

    const columnsEnd: number[] = [];
    const placements: { event: CalendarEvent; col: number }[] = [];

    sorted.forEach((event) => {
      const start = event.startDateTime!.getTime();
      let placedCol = columnsEnd.findIndex((end) => end <= start);

      if (placedCol === -1) {
        placedCol = columnsEnd.length;
        columnsEnd.push(0);
      }

      columnsEnd[placedCol] = event.endDateTime!.getTime();
      placements.push({ event, col: placedCol });
    });

    const totalCols = columnsEnd.length || 1;

    placements.forEach(({ event, col }) => {
      const startMinutes =
        event.startDateTime!.getHours() * 60 + event.startDateTime!.getMinutes(); //prettier-ignore
      const endMinutes = Math.min(
        24 * 60,
        event.endDateTime!.getHours() * 60 + event.endDateTime!.getMinutes()
      );

      results.push({
        event,
        dayIndex,
        startMinutes,
        endMinutes: Math.max(endMinutes, startMinutes + 15),
        col,
        cols: totalCols,
      });
    });
  });

  return results;
}

function formatHourLabel(hour: number): string {
  if (hour === 0) return '12 AM';
  if (hour === 12) return '12 PM';
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}

function formatClock(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours < 12 ? 'AM' : 'PM';
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export {
  getCalendarDays,
  isSameDate,
  isToday,
  getWeekEventSegments,
  parseLocalDate,
  toDateOnly,
  packEventSegments,
  getWeekDays,
  isTimedEvent,
  getTimedEventLayouts,
  formatHourLabel,
  formatClock,
};
