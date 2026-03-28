import { useState } from 'react';
import type {
  CalendarDayConfig,
  CalendarEvent,
  CalendarStyleConfig,
} from '../../../components/calendar';
import { Calendar } from '../../../components/calendar';
import illust from '../../assets/images/forms.png';
import HeroSection from '../../components/HeroSection';
import DashboardLayout from '../../layouts/DashboardLayout';
import type { DateRange } from '../../../clients';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date('2026-3-01')
  );

  const [rangeValue, setRangeValue] = useState<DateRange>({
    start: null,
    end: null,
  });

  const handleRangeCalendarChange = (date: Date) => {
    let newRange: DateRange;

    if (!rangeValue.start || (rangeValue.start !== null && rangeValue.end)) {
      // Start new range
      newRange = { start: date, end: null };
    } else {
      // Complete the range
      if (date < rangeValue.start) {
        newRange = { start: date, end: rangeValue.start };
      } else {
        newRange = { start: rangeValue.start, end: date };
      }
    }

    setRangeValue(newRange);
  };

  // Disable weekend dates
  const disabledDates = [
    new Date(2026, 1, 14), // 14 Feb 2026
    new Date(2026, 1, 15), // 15 Feb 2026
    new Date(2026, 1, 21), // 21 Feb 2026
  ];

  // Configure specific days with dots
  const dayConfigs: CalendarDayConfig[] = [
    {
      date: new Date(2026, 1, 10),
      dots: [
        { color: '#3b82f6' }, // blue
        { color: '#ef4444' }, // red
      ],
    },
    {
      date: new Date(2026, 1, 12),
      dots: [
        { color: '#10b981' }, // green
      ],
    },
  ];

  // Custom styling
  const styleConfig: CalendarStyleConfig = {
    disabled: {
      background: '#fee4e2', // red-500/30
      text: '#f04438', // red-500
    },
  };

  const dummyEvents: CalendarEvent[] = [
    {
      title: 'Sprint Planning',
      subtitle: 'Full Week',
      color: 'primary',
      startDate: '2026-03-1',
      endDate: '2026-03-10',
    },
    {
      title: 'Sprint Planning',
      subtitle: 'Full Week',
      label: '18:00 - 22:00',
      color: 'warning',
      startDate: '2026-03-11',
      endDate: '2026-03-14',
    },
    {
      title: 'Sprint Planning',
      subtitle: 'Full Week',
      label: '18:00 - 22:00',
      color: 'warning',
      startDate: '2026-03-11',
      endDate: '2026-03-14',
    },
    {
      title: 'Implement Backlog',
      label: '18:00 - 22:00',
      color: 'info',
      startDate: '2026-03-1',
      endDate: '2026-03-20',
    },
  ];

  return (
    <DashboardLayout>
      <HeroSection
        title="Calendar"
        description="Calendar component"
        subtitle="Calendar"
        illust={illust}
      />

      <div className="flex flex-col gap-2">
        <Calendar
          variant="compact"
          value={selectedDate}
          onChange={setSelectedDate}
          disabledDates={disabledDates}
          dayConfigs={dayConfigs}
          styleConfig={styleConfig}
          showNavigator={true}
          showHeader={true}
        />
        {selectedDate && (
          <div className="mt-4 text-center">
            <p>Selected: {selectedDate.toLocaleDateString('id-ID')}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Calendar
          variant="compact"
          mode="range"
          value={rangeValue.start}
          rangeValue={rangeValue}
          onChange={handleRangeCalendarChange}
          disabledDates={disabledDates}
          dayConfigs={dayConfigs}
          styleConfig={styleConfig}
          showNavigator={true}
          showHeader={true}
        />
        {selectedDate && (
          <div className="mt-4 text-center">
            <p>
              Selected: {rangeValue.start?.toLocaleDateString('id-ID')} -{' '}
              {rangeValue.end?.toLocaleDateString('id-ID')}
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-2">
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          disabledDates={disabledDates}
          dayConfigs={dayConfigs}
          styleConfig={styleConfig}
          showNavigator={true}
          showHeader={true}
          events={dummyEvents}
        />
        {selectedDate && (
          <div className="mt-4 text-center">
            <p>Selected: {selectedDate.toLocaleDateString('id-ID')}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
