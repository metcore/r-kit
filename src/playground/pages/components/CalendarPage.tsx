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

// Minggu berjalan (bukan tanggal tetap) supaya contoh selalu terlihat
// begitu halaman dibuka, tanpa perlu klik navigasi minggu dulu.
const AWAL_MINGGU_INI = (() => {
  const hariIni = new Date();
  const awal = new Date(hariIni);
  awal.setDate(hariIni.getDate() - hariIni.getDay());
  awal.setHours(0, 0, 0, 0);
  return awal;
})();

const tanggalMinggu = (offsetHari: number, jam = 0, menit = 0) => {
  const tanggal = new Date(AWAL_MINGGU_INI);
  tanggal.setDate(tanggal.getDate() + offsetHari);
  tanggal.setHours(jam, menit, 0, 0);
  return tanggal;
};

const keStringTanggal = (tanggal: Date) => {
  const tahun = tanggal.getFullYear();
  const bulan = String(tanggal.getMonth() + 1).padStart(2, '0');
  const hari = String(tanggal.getDate()).padStart(2, '0');
  return `${tahun}-${bulan}-${hari}`;
};

const AGENDA_MINGGU: CalendarEvent[] = [
  {
    title: 'Kultim di GBK',
    subtitle: 'Divisi Marketing',
    color: 'info',
    startDate: keStringTanggal(tanggalMinggu(0)),
    endDate: keStringTanggal(tanggalMinggu(2)),
  },
  {
    title: 'Sprint Planning',
    subtitle: 'Tim Produk',
    color: 'success',
    startDate: keStringTanggal(tanggalMinggu(1)),
    endDate: keStringTanggal(tanggalMinggu(1)),
    startDateTime: tanggalMinggu(1, 9, 0),
    endDateTime: tanggalMinggu(1, 10, 0),
  },
  {
    title: 'Review Desain',
    subtitle: 'Tim Produk',
    color: 'warning',
    startDate: keStringTanggal(tanggalMinggu(1)),
    endDate: keStringTanggal(tanggalMinggu(1)),
    startDateTime: tanggalMinggu(1, 9, 30),
    endDateTime: tanggalMinggu(1, 10, 30),
  },
  {
    title: 'Audit Internal',
    subtitle: 'Divisi Keuangan',
    color: 'danger',
    startDate: keStringTanggal(tanggalMinggu(3)),
    endDate: keStringTanggal(tanggalMinggu(3)),
    startDateTime: tanggalMinggu(3, 13, 0),
    endDateTime: tanggalMinggu(3, 15, 0),
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

// Hari ini (bukan tanggal tetap) dengan alasan yang sama seperti minggu di atas.
const HARI_INI = (() => {
  const tanggal = new Date();
  tanggal.setHours(0, 0, 0, 0);
  return tanggal;
})();

const jamHariIni = (jam = 0, menit = 0) => {
  const tanggal = new Date(HARI_INI);
  tanggal.setHours(jam, menit, 0, 0);
  return tanggal;
};

const AGENDA_HARI: CalendarEvent[] = [
  {
    title: 'Kultim di GBK',
    subtitle: 'Divisi Marketing',
    color: 'info',
    startDate: keStringTanggal(HARI_INI),
    endDate: keStringTanggal(HARI_INI),
  },
  {
    title: 'Sprint Planning',
    subtitle: 'Tim Produk',
    color: 'success',
    startDate: keStringTanggal(HARI_INI),
    endDate: keStringTanggal(HARI_INI),
    startDateTime: jamHariIni(9, 0),
    endDateTime: jamHariIni(10, 0),
  },
  {
    title: 'Review Desain',
    subtitle: 'Tim Produk',
    color: 'warning',
    startDate: keStringTanggal(HARI_INI),
    endDate: keStringTanggal(HARI_INI),
    startDateTime: jamHariIni(9, 30),
    endDateTime: jamHariIni(10, 30),
  },
  {
    title: 'Sync Backend',
    subtitle: 'Tim Produk',
    color: 'purple',
    startDate: keStringTanggal(HARI_INI),
    endDate: keStringTanggal(HARI_INI),
    startDateTime: jamHariIni(9, 15),
    endDateTime: jamHariIni(9, 45),
  },
  {
    title: 'Audit Internal',
    subtitle: 'Divisi Keuangan',
    color: 'danger',
    startDate: keStringTanggal(HARI_INI),
    endDate: keStringTanggal(HARI_INI),
    startDateTime: jamHariIni(13, 0),
    endDateTime: jamHariIni(15, 0),
  },
];

const exampleWeek = dedent(`
  // startDateTime / endDateTime menempatkan agenda di grid per jam.
  // Tanpa keduanya (atau lintas hari), agenda tampil di baris "All Day".
  const AGENDA_MINGGU: CalendarEvent[] = [
    {
      title: 'Kultim di GBK',
      color: 'info',
      startDate: '2026-03-01',
      endDate: '2026-03-03',
    },
    {
      title: 'Sprint Planning',
      color: 'success',
      startDate: '2026-03-02',
      endDate: '2026-03-02',
      startDateTime: new Date(2026, 2, 2, 9, 0),
      endDateTime: new Date(2026, 2, 2, 10, 0),
    },
  ];

  <Calendar
    type="week"
    events={AGENDA_MINGGU}
    showDefaultController
    backdropOnClick={(day) => setSlotTerpilih(day?.fullDate ?? null)}
    onEventClick={(event) => setJadwalTerpilih(event ?? null)}
  />
`);

const exampleDay = dedent(`
  // Sama seperti Minggu, tapi grid per jam hanya untuk satu hari.
  <Calendar
    type="day"
    events={AGENDA_HARI}
    showDefaultController
    backdropOnClick={(day) => setSlotTerpilih(day?.fullDate ?? null)}
    onEventClick={(event) => setJadwalTerpilih(event ?? null)}
  />
`);

const exampleYear = dedent(`
  // 12 kalender bulan (variant="compact") dalam satu grid.
  // value, dayConfigs, dan styleConfig berlaku untuk semua bulan sekaligus.
  <Calendar
    type="year"
    defaultYear={2026}
    value={tanggal}
    onChange={setTanggal}
    dayConfigs={PENANDA}
    showDefaultController
  />
`);

const formatTanggal = (date: Date | null | undefined) =>
  date != null
    ? date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';

const formatTanggalJam = (date: Date | null | undefined) =>
  date != null
    ? date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

export default function CalendarPage() {
  const [tanggal, setTanggal] = useState<Date | null>(new Date(2026, 2, 1));
  const [rentang, setRentang] = useState<DateRange>({ start: null, end: null });
  const [agendaTerpilih, setAgendaTerpilih] = useState<CalendarEvent | null>(
    null
  );
  const [jadwalTerpilih, setJadwalTerpilih] = useState<CalendarEvent | null>(
    null
  );
  const [slotTerpilih, setSlotTerpilih] = useState<Date | null>(null);

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

        <MainSection
          title="Tampilan Minggu"
          code={exampleWeek}
          contentClassName="flex flex-col gap-3"
        >
          <Calendar
            type="week"
            events={AGENDA_MINGGU}
            showDefaultController
            backdropOnClick={(day) => setSlotTerpilih(day?.fullDate ?? null)}
            onEventClick={(event) => setJadwalTerpilih(event ?? null)}
          />
          <Text
            variant="t1"
            className="text-gray-800"
            value={
              jadwalTerpilih != null
                ? `Agenda dipilih: ${jadwalTerpilih.title}`
                : slotTerpilih != null
                  ? `Slot kosong diklik: ${formatTanggalJam(slotTerpilih)}`
                  : 'Klik agenda atau slot kosong pada grid per jam.'
            }
          />
        </MainSection>

        <MainSection
          title="Tampilan Hari"
          code={exampleDay}
          contentClassName="flex flex-col gap-3"
        >
          <Calendar
            type="day"
            events={AGENDA_HARI}
            showDefaultController
            backdropOnClick={(day) => setSlotTerpilih(day?.fullDate ?? null)}
            onEventClick={(event) => setJadwalTerpilih(event ?? null)}
          />
          <Text
            variant="t1"
            className="text-gray-800"
            value={
              jadwalTerpilih != null
                ? `Agenda dipilih: ${jadwalTerpilih.title}`
                : slotTerpilih != null
                  ? `Slot kosong diklik: ${formatTanggalJam(slotTerpilih)}`
                  : 'Klik agenda atau slot kosong pada grid per jam.'
            }
          />
        </MainSection>

        <MainSection
          title="Tampilan Tahun"
          code={exampleYear}
          contentClassName="flex flex-col gap-3"
        >
          <Calendar
            type="year"
            defaultYear={2026}
            value={tanggal}
            onChange={setTanggal}
            dayConfigs={PENANDA}
            showDefaultController
          />
          <Text
            variant="t1"
            className="text-gray-800"
            value={`Terpilih: ${formatTanggal(tanggal)}`}
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
