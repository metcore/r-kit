import dedent from 'dedent';
import { Button } from '../../../components/button';
import { useToast } from '../../../components/toast';
import Toast from '../../../components/toast/toast-card';
import type { BaseColor } from '../../../components/base';
import illust from '../../../assets/images/feedback.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';

const TONES: { color: BaseColor; title: string; description: string }[] = [
  {
    color: 'primary',
    title: 'Perubahan tersimpan',
    description: 'Data profil berhasil diperbarui.',
  },
  {
    color: 'success',
    title: 'Pengajuan disetujui',
    description: 'Cuti Anda tercatat di kalender tim.',
  },
  {
    color: 'danger',
    title: 'Gagal menyimpan',
    description: 'Periksa koneksi lalu coba lagi.',
  },
  {
    color: 'warning',
    title: 'Kuota hampir habis',
    description: 'Sisa 2 hari cuti tahunan.',
  },
  {
    color: 'info',
    title: 'Versi baru tersedia',
    description: 'Muat ulang halaman untuk memakainya.',
  },
  {
    color: 'secondary',
    title: 'Draf disimpan',
    description: 'Terakhir disimpan beberapa detik lalu.',
  },
  {
    color: 'orange',
    title: 'Menunggu verifikasi',
    description: 'Dokumen sedang ditinjau HRD.',
  },
  {
    color: 'purple',
    title: 'Diarsipkan',
    description: 'Item dipindahkan ke arsip.',
  },
  {
    color: 'gray',
    title: 'Tidak ada perubahan',
    description: 'Tidak ada yang perlu disimpan.',
  },
];

const exampleCard = dedent(`
  import Toast from '@herca/r-kit/toast-card';

  // Toast sebagai kartu statis, berguna untuk menyusun tampilan
  // atau menampilkan pesan yang menetap di dalam halaman.
  <Toast
    color="success"
    title="Pengajuan disetujui"
    description="Cuti Anda tercatat di kalender tim."
  />
`);

const exampleIcon = dedent(`
  <Toast
    icon="check"
    color="success"
    title="Pengajuan disetujui"
    description="Cuti Anda tercatat di kalender tim."
  />
`);

const exampleAction = dedent(`
  // actionLabel memunculkan tombol aksi di sisi kanan.
  <Toast
    color="danger"
    title="Gagal menyimpan"
    description="Periksa koneksi lalu coba lagi."
    actionLabel="Coba lagi"
    onClickAction={() => simpanUlang()}
  />
`);

const exampleOutline = dedent(`
  // variant="outline" memberi latar putih dengan garis tepi berwarna.
  <Toast
    variant="outline"
    color="info"
    title="Versi baru tersedia"
    description="Muat ulang halaman untuk memakainya."
  />
`);

const exampleProvider = dedent(`
  import { ToastProvider, useToast } from '@herca/r-kit';

  // 1. Bungkus aplikasi sekali di akar.
  //    position: top-right (bawaan) | top-left | top-center
  //              bottom-right | bottom-left | bottom-center
  <ToastProvider position="top-right">
    <App />
  </ToastProvider>

  // 2. Panggil dari komponen mana pun.
  const toast = useToast();

  <Button
    onClick={() =>
      toast.show({
        color: 'success',
        icon: 'check',
        title: 'Pengajuan disetujui',
        description: 'Cuti Anda tercatat di kalender tim.',
        duration: 3000,
      })
    }
  >
    Tampilkan Toast
  </Button>
`);

const exampleClose = dedent(`
  // onClose menampilkan tombol silang pada kartu.
  <Toast
    color="gray"
    title="Tidak ada perubahan"
    description="Tidak ada yang perlu disimpan."
    onClose={() => sembunyikan()}
  />
`);

export default function ToastPage() {
  const toast = useToast();

  return (
    <>
      <HeroSection
        illust={illust}
        title="Feedback"
        subtitle="Snackbar/Toast"
        description="Pesan singkat yang muncul sesaat untuk mengabarkan hasil sebuah aksi tanpa memutus pekerjaan user."
      />

      <div className="flex flex-col gap-4">
        <MainSection
          title="Dipanggil Lewat useToast"
          code={exampleProvider}
          contentClassName="flex flex-wrap gap-3"
        >
          {TONES.slice(0, 5).map((tone) => (
            <Button
              key={tone.color}
              color={tone.color}
              onClick={() =>
                toast.show({
                  color: tone.color,
                  title: tone.title,
                  description: tone.description,
                  duration: 3000,
                })
              }
            >
              {tone.color}
            </Button>
          ))}
        </MainSection>

        <MainSection
          title="Warna"
          code={exampleCard}
          contentClassName="flex flex-row flex-wrap gap-4"
        >
          {TONES.map((tone) => (
            <Toast
              key={tone.color}
              color={tone.color}
              title={tone.title}
              description={tone.description}
            />
          ))}
        </MainSection>

        <MainSection
          title="Dengan Ikon"
          code={exampleIcon}
          contentClassName="flex flex-row flex-wrap gap-4"
        >
          {TONES.map((tone) => (
            <Toast
              key={tone.color}
              icon="check"
              color={tone.color}
              title={tone.title}
              description={tone.description}
            />
          ))}
        </MainSection>

        <MainSection
          title="Dengan Tombol Aksi"
          code={exampleAction}
          contentClassName="flex flex-row flex-wrap gap-4"
        >
          {TONES.slice(0, 5).map((tone) => (
            <Toast
              key={tone.color}
              icon="check"
              color={tone.color}
              title={tone.title}
              description={tone.description}
              actionLabel="Coba lagi"
              onClickAction={() =>
                toast.show({
                  color: tone.color,
                  title: 'Aksi dijalankan',
                  description: `Tombol pada toast ${tone.color} ditekan.`,
                  duration: 2500,
                })
              }
            />
          ))}
        </MainSection>

        <MainSection
          title="Varian Outline"
          code={exampleOutline}
          contentClassName="flex flex-row flex-wrap gap-4"
        >
          {TONES.map((tone) => (
            <Toast
              key={tone.color}
              variant="outline"
              color={tone.color}
              title={tone.title}
              description={tone.description}
            />
          ))}
        </MainSection>

        <GridWrapper>
          <MainSection title="Dengan Tombol Tutup" code={exampleClose}>
            <Toast
              color="gray"
              title="Tidak ada perubahan"
              description="Tidak ada yang perlu disimpan."
              onClose={() => undefined}
            />
          </MainSection>

          <MainSection title="Outline Dengan Aksi" code={exampleAction}>
            <Toast
              variant="outline"
              icon="exclamation-mark"
              color="warning"
              title="Kuota hampir habis"
              description="Sisa 2 hari cuti tahunan."
              actionLabel="Ajukan"
              onClickAction={() => undefined}
            />
          </MainSection>
        </GridWrapper>

        <Footer
          title="Snackbar/Toast"
          backTo="/playground/alert"
          backToTitle="Alert"
          nextTo="/playground/accordion"
          nextToTitle="Accordion"
        />
      </div>
    </>
  );
}
