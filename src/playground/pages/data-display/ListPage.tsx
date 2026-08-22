import dedent from 'dedent';
import { List, ListItem } from '../../../components/list';
import { Icon } from '../../../components/icons';
import { Switch } from '../../../clients';
import { Text } from '../../../components/text';
import illust from '../../../assets/images/data-display.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';

const DOKUMEN = [
  'Surat Keputusan Direksi 2026',
  'Panduan Onboarding Karyawan',
  'Kebijakan Kerja Hibrida',
  'Prosedur Pengajuan Reimburse',
];

const PENGATURAN = [
  { label: 'Notifikasi email', hint: 'Ringkasan harian pukul 08.00' },
  { label: 'Notifikasi push', hint: 'Langsung saat ada pengajuan baru' },
  { label: 'Laporan mingguan', hint: 'Dikirim setiap Senin pagi' },
];

const exampleBasic = dedent(`
  import { List, ListItem } from '@herca/r-kit';

  <List>
    <ListItem>Surat Keputusan Direksi 2026</ListItem>
    <ListItem>Panduan Onboarding Karyawan</ListItem>
  </List>
`);

const exampleStriped = dedent(`
  // variant="striped" memberi latar belang-seling agar baris
  // panjang lebih mudah diikuti mata.
  <List variant="striped">
    ...
  </List>
`);

const exampleActive = dedent(`
  // active menyorot baris, misalnya item yang sedang dibuka.
  <ListItem active>Kebijakan Kerja Hibrida</ListItem>
`);

const exampleClickable = dedent(`
  // Dengan onClick, ListItem dirender sebagai <button>
  // lengkap dengan gaya hover dan fokus keyboard.
  <ListItem onClick={() => buka(dokumen)}>
    {dokumen.nama}
  </ListItem>
`);

const exampleContent = dedent(`
  // ListItem menerima konten bebas, bukan hanya teks.
  <ListItem>
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <Text variant="t2" className="text-gray-900">Notifikasi email</Text>
        <Text variant="t2" className="text-gray-700">
          Ringkasan harian pukul 08.00
        </Text>
      </div>
      <Switch />
    </div>
  </ListItem>
`);

// Card pembungkus List memakai rounded-xl tanpa overflow-hidden, sedangkan
// ListItem di dalamnya hanya melengkung di sisi atas (rounded-t-md). Akibatnya
// sudut ListItem menonjol keluar lengkung Card — paling kelihatan saat
// accordion tertutup dan hanya menyisakan satu baris. Card/List/Accordion
// adalah komponen library yang sudah rilis, dan Accordion bahkan membuang
// prop className, jadi pengurungannya dilakukan dari sisi playground.
const KURUNG_SUDUT = '[&_.rounded-xl]:overflow-hidden';

export default function ListPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Data Display"
        subtitle="List"
        description="Menyusun sekumpulan item sejenis secara berurutan agar mudah dipindai dari atas ke bawah."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection
            title="Basic"
            code={exampleBasic}
            contentClassName={KURUNG_SUDUT}
          >
            <List>
              {DOKUMEN.map((item) => (
                <ListItem key={item}>
                  <Text variant="t2" className="text-gray-800">
                    {item}
                  </Text>
                </ListItem>
              ))}
            </List>
          </MainSection>

          <MainSection
            title="Belang-seling"
            code={exampleStriped}
            contentClassName={KURUNG_SUDUT}
          >
            <List variant="striped">
              {DOKUMEN.map((item) => (
                <ListItem key={item}>
                  <Text variant="t2" className="text-gray-800">
                    {item}
                  </Text>
                </ListItem>
              ))}
            </List>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection
            title="Baris Disorot"
            code={exampleActive}
            contentClassName={KURUNG_SUDUT}
          >
            <List>
              {DOKUMEN.map((item, index) => (
                <ListItem key={item} active={index === 2}>
                  <Text variant="t2" className="text-gray-800">
                    {item}
                  </Text>
                </ListItem>
              ))}
            </List>
          </MainSection>

          <MainSection
            title="Bisa Diklik"
            code={exampleClickable}
            contentClassName={KURUNG_SUDUT}
          >
            <List>
              {DOKUMEN.map((item) => (
                <ListItem key={item} onClick={() => undefined}>
                  <div className="flex items-center justify-between gap-3">
                    <Text variant="t2" className="text-gray-800">
                      {item}
                    </Text>
                    <Icon
                      name="angle-right-small"
                      size={18}
                      className="text-gray-600"
                    />
                  </div>
                </ListItem>
              ))}
            </List>
          </MainSection>
        </GridWrapper>

        <MainSection
          title="Konten Bebas"
          code={exampleContent}
          contentClassName={KURUNG_SUDUT}
        >
          <List>
            {PENGATURAN.map((item) => (
              <ListItem key={item.label}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Icon name="bell" size={20} className="text-gray-700" />
                    <div className="flex flex-col">
                      <Text variant="t2" className="text-gray-900">
                        {item.label}
                      </Text>
                      <Text variant="t2" className="text-gray-700">
                        {item.hint}
                      </Text>
                    </div>
                  </div>
                  <Switch />
                </div>
              </ListItem>
            ))}
          </List>
        </MainSection>

        <Footer
          title="List"
          backTo="/playground/accordion"
          backToTitle="Accordion"
          nextTo="/playground/table"
          nextToTitle="Table"
        />
      </div>
    </>
  );
}
