import { useState } from 'react';
import dedent from 'dedent';
import { Accordion, AccordionItem } from '../../../components/accordion';
import { Icon } from '../../../components/icons';
import { Switch } from '../../../clients';
import { Text } from '../../../components/text';
import illust from '../../../assets/images/data-display.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';

const FAQ = [
  'Cuti tahunan dapat diajukan paling lambat 3 hari kerja sebelum tanggal mulai.',
  'Sisa kuota cuti direset setiap 1 Januari dan tidak dapat diakumulasi.',
  'Persetujuan dilakukan berjenjang: HRD lebih dulu, lalu manajer terkait.',
  'Pembatalan cuti yang sudah disetujui harus diajukan lewat HRD.',
];

const PENGATURAN = [
  { label: 'Notifikasi email', hint: 'Ringkasan harian pukul 08.00' },
  { label: 'Notifikasi push', hint: 'Langsung saat ada pengajuan baru' },
  { label: 'Laporan mingguan', hint: 'Dikirim setiap Senin pagi' },
];

const exampleBasic = dedent(`
  import { Accordion, AccordionItem } from '@herca/r-kit';

  // renderHeader adalah bagian yang selalu terlihat dan bisa diklik.
  <Accordion renderHeader={<Text weight="semibold">Kebijakan Cuti</Text>}>
    <AccordionItem>Cuti diajukan 3 hari kerja sebelumnya.</AccordionItem>
    <AccordionItem>Kuota direset setiap 1 Januari.</AccordionItem>
  </Accordion>
`);

const exampleStriped = dedent(`
  // variant="striped" memberi latar belang-seling pada tiap baris.
  <Accordion variant="striped" renderHeader={header}>
    ...
  </Accordion>
`);

const exampleControlled = dedent(`
  const [terbuka, setTerbuka] = useState(false);

  // isOpen mengendalikan dari luar, onCollapse memberi tahu
  // perubahannya sehingga ikon panah bisa ikut diputar.
  <Accordion
    isOpen={terbuka}
    onCollapse={setTerbuka}
    renderHeader={
      <div className="flex items-center justify-between">
        <Text weight="semibold">Kebijakan Cuti</Text>
        <Icon name={terbuka ? 'arrow-up' : 'arrow-down'} size={15} />
      </div>
    }
  >
    ...
  </Accordion>
`);

const exampleActive = dedent(`
  // active menyorot baris tertentu, misalnya hasil pencarian.
  <AccordionItem active>Baris yang sedang disorot</AccordionItem>
`);

const exampleContent = dedent(`
  // AccordionItem menerima konten bebas, bukan hanya teks.
  <AccordionItem>
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <Text variant="t2" className="text-gray-900">Notifikasi email</Text>
        <Text variant="t2" className="text-gray-700">
          Ringkasan harian pukul 08.00
        </Text>
      </div>
      <Switch />
    </div>
  </AccordionItem>
`);

// Card pembungkus List memakai rounded-xl tanpa overflow-hidden, sedangkan
// ListItem di dalamnya hanya melengkung di sisi atas (rounded-t-md). Akibatnya
// sudut ListItem menonjol keluar lengkung Card — paling kelihatan saat
// accordion tertutup dan hanya menyisakan satu baris. Card/List/Accordion
// adalah komponen library yang sudah rilis, dan Accordion bahkan membuang
// prop className, jadi pengurungannya dilakukan dari sisi playground.
const KURUNG_SUDUT = '[&_.rounded-xl]:overflow-hidden';

export default function AccordionPage() {
  const [terbuka, setTerbuka] = useState(false);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Data Display"
        subtitle="Accordion"
        description="Menyembunyikan dan menampilkan panel konten agar halaman tetap ringkas tanpa kehilangan informasi."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection
            title="Basic"
            code={exampleBasic}
            contentClassName={KURUNG_SUDUT}
          >
            <Accordion
              renderHeader={
                <Text
                  variant="t2"
                  weight="semibold"
                  className="text-gray-900"
                  value="Kebijakan Cuti"
                />
              }
            >
              {FAQ.map((item) => (
                <AccordionItem key={item}>
                  <Text variant="t2" className="text-gray-800">
                    {item}
                  </Text>
                </AccordionItem>
              ))}
            </Accordion>
          </MainSection>

          <MainSection
            title="Belang-seling"
            code={exampleStriped}
            contentClassName={KURUNG_SUDUT}
          >
            <Accordion
              variant="striped"
              renderHeader={
                <Text
                  variant="t2"
                  weight="semibold"
                  className="text-gray-900"
                  value="Kebijakan Cuti"
                />
              }
            >
              {FAQ.map((item) => (
                <AccordionItem key={item}>
                  <Text variant="t2" className="text-gray-800">
                    {item}
                  </Text>
                </AccordionItem>
              ))}
            </Accordion>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection
            title="Terkendali dari Luar"
            code={exampleControlled}
            contentClassName={KURUNG_SUDUT}
          >
            <Accordion
              isOpen={terbuka}
              onCollapse={setTerbuka}
              renderHeader={
                <div className="flex items-center justify-between">
                  <Text
                    variant="t2"
                    weight="semibold"
                    className="text-gray-900"
                    value="Kebijakan Cuti"
                  />
                  <Icon
                    name={terbuka ? 'arrow-up' : 'arrow-down'}
                    className="text-gray-600"
                    size={15}
                  />
                </div>
              }
            >
              {FAQ.map((item) => (
                <AccordionItem key={item}>
                  <Text variant="t2" className="text-gray-800">
                    {item}
                  </Text>
                </AccordionItem>
              ))}
            </Accordion>
          </MainSection>

          <MainSection
            title="Baris Disorot"
            code={exampleActive}
            contentClassName={KURUNG_SUDUT}
          >
            <Accordion
              renderHeader={
                <Text
                  variant="t2"
                  weight="semibold"
                  className="text-gray-900"
                  value="Hasil Pencarian"
                />
              }
            >
              {FAQ.map((item, index) => (
                <AccordionItem key={item} active={index === 1}>
                  <Text variant="t2" className="text-gray-800">
                    {item}
                  </Text>
                </AccordionItem>
              ))}
            </Accordion>
          </MainSection>
        </GridWrapper>

        <MainSection
          title="Konten Bebas"
          code={exampleContent}
          contentClassName={KURUNG_SUDUT}
        >
          <Accordion
            renderHeader={
              <Text
                variant="t2"
                weight="semibold"
                className="text-gray-900"
                value="Pengaturan Notifikasi"
              />
            }
          >
            {PENGATURAN.map((item) => (
              <AccordionItem key={item.label}>
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
              </AccordionItem>
            ))}
          </Accordion>
        </MainSection>

        <Footer
          title="Accordion"
          backTo="/playground/toast"
          backToTitle="Snackbar/Toast"
          nextTo="/playground/list"
          nextToTitle="List"
        />
      </div>
    </>
  );
}
