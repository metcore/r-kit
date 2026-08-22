import { useState } from 'react';
import dedent from 'dedent';
import { Calendar } from '../../../components/calendar';
import type {
  CalendarDayConfig,
  CalendarEvent,
  CalendarStyleConfig,
} from '../../../components/calendar';
import type { DateRange } from '../../../clients';
import { Text } from '../../../components/text';
import illust from '../../../assets/images/forms.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';

// Bulan di JavaScript dihitung dari 0, jadi 2 = Maret.
const HARI_LIBUR = [
  new Date(2026, 2, 14),
  new Date(2026, 2, 15),
  new Date(2026, 2, 21),
];

const PENANDA: CalendarDayConfig[] = [
  {
    date: new Date(2026, 2, 10),
    dots: [{ color: '#3b82f6' }, { color: '#ef4444' }],
  },
  { date: new Date(2026, 2, 12), dots: [{ color: '#10b981' }] },
];

const GAYA_LIBUR: CalendarStyleConfig = {
  disabled: { background: '#fee4e2', text: '#f04438' },
};

const AGENDA: CalendarEvent[] = [
  {
    title: 'Sprint Planning',
    subtitle: 'Tim Produk',
    color: 'primary',
    startDate: '2026-03-02',
    endDate: '2026-03-06',
  },
  {
    title: 'Audit Internal',
    subtitle: 'Divisi Keuangan',
    color: 'warning',
    startDate: '2026-03-09',
    endDate: '2026-03-13',
  },
  {
    title: 'Rilis v2.0',
    subtitle: 'Seharian',
    color: 'danger',
    startDate: '2026-03-20',
    endDate: '2026-03-20',
  },
];

const exampleBasic = dedent(`
  import { Calendar } from '@herca/r-kit';

  const [tanggal, setTanggal] = useState<Date | null>(new Date());

  <Calendar variant="compact" value={tanggal} onChange={setTanggal} />
`);

const exampleRange = dedent(`
  const [rentang, setRentang] = useState<DateRange>({ start: null, end: null });

  const pilihTanggal = (date: Date) => {
    // Klik pertama menetapkan awal; klik kedua menutup rentang.
    setRentang((prev) =>
      prev.start === null || prev.end !== null
        ? { start: date, end: null }
        : date < prev.start
          ? { start: date, end: prev.start }
          : { start: prev.start, end: date }
    );
  };

  <Calendar
    mode="range"
    variant="compact"
    value={rentang.start}
    rangeValue={rentang}
    onChange={pilihTanggal}
  />
`);

const exampleDisabled = dedent(`
  // disabledDates mematikan tanggal tertentu,
  // styleConfig mengatur tampilannya.
  const HARI_LIBUR = [new Date(2026, 2, 14), new Date(2026, 2, 15)];

  <Calendar
    variant="compact"
    disabledDates={HARI_LIBUR}
    styleConfig={{ disabled: { background: '#fee4e2', text: '#f04438' } }}
  />
`);

const exampleDots = dedent(`
  // dayConfigs menaruh titik penanda di bawah tanggal,
  // berguna untuk menunjukkan ada aktivitas di hari itu.
  <Calendar
    variant="compact"
    dayConfigs={[
      { date: new Date(2026, 2, 10), dots: [{ color: '#3b82f6' }, { color: '#ef4444' }] },
      { date: new Date(2026, 2, 12), dots: [{ color: '#10b981' }] },
    ]}
  />
`);

const exampleEvents = dedent(`
  // Varian penuh menampilkan agenda sebagai bilah lintas hari.
  const AGENDA: CalendarEvent[] = [
    {
      title: 'Sprint Planning',
      subtitle: 'Tim Produk',
      color: 'primary',
      startDate: '2026-03-02',
      endDate: '2026-03-06',
    },
  ];

  <Calendar events={AGENDA} useLimitEvent={false} onEventClick={handleClick} />
`);

const formatTanggal = (date: Date | null | undefined) =>
  date != null
    ? date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';

export default function CalendarPage() {
  const [tanggal, setTanggal] = useState<Date | null>(new Date(2026, 2, 1));
  const [rentang, setRentang] = useState<DateRange>({ start: null, end: null });
  const [agendaTerpilih, setAgendaTerpilih] = useState<CalendarEvent | null>(
    null
  );

  const pilihRentang = (date: Date) => {
    setRentang((prev) =>
      prev.start === null || prev.end !== null
        ? { start: date, end: null }
        : date < prev.start
          ? { start: date, end: prev.start }
          : { start: prev.start, end: date }
    );
  };

  return (
    <>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Calendar"
        description="Menampilkan tanggal dalam tampilan bulanan untuk melihat, memilih, dan menandai tanggal secara langsung."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection
            title="Basic"
            code={exampleBasic}
            contentClassName="flex flex-col gap-3"
          >
            <Calendar
              variant="compact"
              value={tanggal}
              onChange={setTanggal}
              showNavigator
              showHeader
            />
            <Text
              variant="t1"
              className="text-gray-800"
              value={`Terpilih: ${formatTanggal(tanggal)}`}
            />
          </MainSection>

          <MainSection
            title="Mode Rentang"
            code={exampleRange}
            contentClassName="flex flex-col gap-3"
          >
            <Calendar
              mode="range"
              variant="compact"
              value={rentang.start}
              rangeValue={rentang}
              onChange={pilihRentang}
              showNavigator
              showHeader
            />
            <Text
              variant="t1"
              className="text-gray-800"
              value={`${formatTanggal(rentang.start)} — ${formatTanggal(rentang.end)}`}
            />
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection title="Tanggal Dinonaktifkan" code={exampleDisabled}>
            <Calendar
              variant="compact"
              defaultMonth={2}
              defaultYear={2026}
              disabledDates={HARI_LIBUR}
              styleConfig={GAYA_LIBUR}
              showNavigator
              showHeader
            />
          </MainSection>

          <MainSection title="Penanda Titik" code={exampleDots}>
            <Calendar
              variant="compact"
              defaultMonth={2}
              defaultYear={2026}
              dayConfigs={PENANDA}
              showNavigator
              showHeader
            />
          </MainSection>
        </GridWrapper>

        <MainSection
          title="Dengan Agenda"
          code={exampleEvents}
          contentClassName="flex flex-col gap-3"
        >
          <Calendar
            defaultMonth={2}
            defaultYear={2026}
            value={tanggal}
            onChange={setTanggal}
            events={AGENDA}
            useLimitEvent={false}
            onEventClick={(event) => setAgendaTerpilih(event ?? null)}
            showNavigator
            showHeader
          />
          <Text
            variant="t1"
            className="text-gray-800"
            value={
              agendaTerpilih != null
                ? `Agenda dipilih: ${agendaTerpilih.title}`
                : 'Klik salah satu bilah agenda untuk melihat detailnya.'
            }
          />
        </MainSection>

        <Footer
          title="Calendar"
          backTo="/playground/timeline"
          backToTitle="Timeline"
          nextTo="/playground/badge"
          nextToTitle="Badge"
        />
      </div>
    </>
  );
}
