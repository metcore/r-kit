import dedent from 'dedent';
import { Timeline } from '../../../components/timeline';
import type { TimeLineColor } from '../../../components/timeline/types';
import { Badge } from '../../../components/badge';
import { Button } from '../../../components/button';
import { Icon } from '../../../components/icons';
import { Text } from '../../../components/text';
import illust from '../../../assets/images/data-display.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';

const COLORS: TimeLineColor[] = [
  'primary',
  'success',
  'danger',
  'warning',
  'orange',
  'info',
  'purple',
  'gray',
];

const RIWAYAT = [
  {
    label: '08:15',
    title: 'Pengajuan dibuat',
    subtitle: 'oleh Herca Pratama',
    description:
      'Pengajuan cuti tahunan sebanyak 3 hari kerja untuk tanggal 12-14 Maret.',
    color: 'primary' as TimeLineColor,
  },
  {
    label: '09:40',
    title: 'Diverifikasi HRD',
    subtitle: 'oleh Siti Rahayu',
    description: 'Sisa kuota cuti mencukupi, dokumen pendukung lengkap.',
    color: 'info' as TimeLineColor,
  },
  {
    label: '13:05',
    title: 'Menunggu persetujuan manajer',
    subtitle: 'Bagus Nugroho',
    description: 'Notifikasi sudah dikirim, batas respons 2 hari kerja.',
    color: 'warning' as TimeLineColor,
  },
  {
    label: '16:20',
    title: 'Disetujui',
    subtitle: 'oleh Bagus Nugroho',
    description: 'Cuti tercatat di kalender tim dan sistem penggajian.',
    color: 'success' as TimeLineColor,
  },
];

const exampleBasic = dedent(`
  import { Timeline } from '@herca/r-kit';

  // Garis putus-putus digambar turun dari titik setiap item.
  // isFirst membuang garis itu, jadi pasang di item TERAKHIR
  // supaya rantainya tidak menjuntai. Item tunggal juga memakainya.
  <Timeline
    isFirst
    value={{
      label: '08:15',
      title: 'Pengajuan dibuat',
      subtitle: 'oleh Herca Pratama',
      description: 'Pengajuan cuti tahunan sebanyak 3 hari kerja.',
    }}
  />
`);

const exampleColor = dedent(`
  // color mewarnai titik dan garis penghubungnya.
  <Timeline color="success" value={{ title: 'Disetujui' }} />
  <Timeline color="danger" value={{ title: 'Ditolak' }} />
`);

const exampleBadge = dedent(`
  // badge menempel di sebelah judul, berguna untuk status.
  <Timeline
    color="warning"
    badge={{ value: 'Menunggu', color: 'warning', size: 'sm' }}
    value={{ title: 'Menunggu persetujuan manajer' }}
  />
`);

const exampleAdvanced = dedent(`
  // advanced menyisipkan konten bebas di bawah deskripsi,
  // misalnya tombol aksi atau lampiran.
  <Timeline
    value={{
      title: 'Dokumen diunggah',
      description: 'surat-keterangan.pdf',
      advanced: () => (
        <Button size="sm" variant="outline" color="gray" className="gap-2">
          <Icon name="download" size={14} />
          Unduh
        </Button>
      ),
    }}
  />
`);

const exampleRiwayat = dedent(`
  // Rangkai beberapa Timeline untuk membentuk satu alur riwayat.
  // Hanya item terakhir yang diberi isFirst agar garisnya berhenti
  // di titik terakhir.
  {RIWAYAT.map((item, index) => (
    <Timeline
      key={item.title}
      isFirst={index === RIWAYAT.length - 1}
      color={item.color}
      value={item}
    />
  ))}
`);

const exampleMinimal = dedent(`
  // Hanya title yang wajib; label, subtitle, dan description opsional.
  <Timeline color="success" value={{ label: '07:00', title: 'Absen masuk' }} />
  <Timeline color="success" value={{ label: '12:00', title: 'Istirahat' }} />
  <Timeline isFirst color="success" value={{ label: '16:00', title: 'Absen pulang' }} />
`);

export default function TimelinePage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Timeline"
        description="Menyusun rangkaian peristiwa secara berurutan agar riwayat sebuah proses mudah ditelusuri dari awal hingga akhir."
      />

      <div className="flex flex-col gap-4">
        <MainSection title="Riwayat Pengajuan" code={exampleRiwayat}>
          {RIWAYAT.map((item, index) => (
            <Timeline
              key={item.title}
              isFirst={index === RIWAYAT.length - 1}
              color={item.color}
              value={item}
            />
          ))}
        </MainSection>

        <GridWrapper>
          <MainSection title="Basic" code={exampleBasic}>
            <Timeline
              isFirst
              value={{
                label: '08:15',
                title: 'Pengajuan dibuat',
                subtitle: 'oleh Herca Pratama',
                description:
                  'Pengajuan cuti tahunan sebanyak 3 hari kerja untuk tanggal 12-14 Maret.',
              }}
            />
          </MainSection>

          <MainSection title="Dengan Badge" code={exampleBadge}>
            <Timeline
              isFirst
              color="warning"
              badge={{ value: 'Menunggu', color: 'warning', size: 'sm' }}
              value={{
                label: '13:05',
                title: 'Menunggu persetujuan manajer',
                subtitle: 'Bagus Nugroho',
                description: 'Batas respons 2 hari kerja.',
              }}
            />
          </MainSection>
        </GridWrapper>

        <MainSection title="Warna" code={exampleColor}>
          {COLORS.map((color, index) => (
            <Timeline
              key={color}
              isFirst={index === COLORS.length - 1}
              color={color}
              badge={{ value: color, color, size: 'sm' }}
              value={{
                title: `Warna ${color}`,
                description: 'Titik dan garis penghubung ikut berubah.',
              }}
            />
          ))}
        </MainSection>

        <MainSection title="Konten Tambahan" code={exampleAdvanced}>
          <Timeline
            color="info"
            value={{
              label: '10:22',
              title: 'Dokumen diunggah',
              subtitle: 'oleh Siti Rahayu',
              description: 'surat-keterangan-dokter.pdf · 240 KB',
              advanced: () => (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    color="gray"
                    className="gap-2"
                  >
                    <Icon name="download" size={14} />
                    Unduh
                  </Button>
                  <Badge color="info" size="sm">
                    Terverifikasi
                  </Badge>
                </div>
              ),
            }}
          />
          <Timeline
            isFirst
            color="gray"
            value={{
              label: '10:25',
              title: 'Menunggu tinjauan',
              description: 'Belum ada tindakan lanjutan.',
            }}
          />
        </MainSection>

        <MainSection
          title="Tanpa Deskripsi"
          code={exampleMinimal}
          contentClassName="max-w-md"
        >
          <Timeline
            color="success"
            value={{ label: '07:00', title: 'Absen masuk' }}
          />
          <Timeline
            color="success"
            value={{ label: '12:00', title: 'Istirahat' }}
          />
          <Timeline
            isFirst
            color="success"
            value={{ label: '16:00', title: 'Absen pulang' }}
          />
          <Text
            variant="t2"
            className="mt-3 text-gray-700"
            value="Hanya label dan title yang wajib; sisanya opsional."
          />
        </MainSection>

        <Footer
          title="Timeline"
          backTo="/playground/icons"
          backToTitle="Icon"
          nextTo="/playground/calendar"
          nextToTitle="Calendar"
        />
      </div>
    </>
  );
}
