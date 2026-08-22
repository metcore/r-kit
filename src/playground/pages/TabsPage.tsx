import { useState } from 'react';
import dedent from 'dedent';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/tabs';
import { Icon } from '../../components/icons';
import { Text } from '../../components/text';
import { Button } from '../../components/button';
import illust from '../../assets/images/navigation.png';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

const exampleBasic = dedent(`
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '@herca/r-kit';

  // id wajib diisi dan harus unik dalam satu halaman.
  <Tabs id="pengaturan" defaultValue="akun">
    <TabsList>
      <TabsTrigger value="akun">Akun</TabsTrigger>
      <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
    </TabsList>

    <TabsContent value="akun">Isi tab akun</TabsContent>
    <TabsContent value="notifikasi">Isi tab notifikasi</TabsContent>
  </Tabs>
`);

const exampleIcon = dedent(`
  <TabsTrigger value="akun">
    <Icon name="user" size={16} className="mr-2" />
    Akun
  </TabsTrigger>
`);

const exampleVertical = dedent(`
  // orientation="vertical" menaruh daftar tab di sisi kiri.
  <Tabs id="laporan" defaultValue="ringkasan" orientation="vertical">
    <TabsList>
      <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
      <TabsTrigger value="rincian">Rincian</TabsTrigger>
    </TabsList>

    <TabsContent value="ringkasan">...</TabsContent>
    <TabsContent value="rincian">...</TabsContent>
  </Tabs>
`);

const exampleDisabled = dedent(`
  <TabsTrigger value="arsip" disabled>
    Arsip
  </TabsTrigger>
`);

const exampleControlled = dedent(`
  const [tab, setTab] = useState('akun');

  // Kendalikan dari luar lewat value + onValueChange,
  // sehingga tab bisa dipindah dari tombol mana pun.
  <Tabs id="terkendali" value={tab} onValueChange={setTab}>
    ...
  </Tabs>
`);

const exampleUrlReplace = dedent(`
  // Setiap Tabs tak-terkendali menyimpan tab aktifnya ke query
  // string sebagai ?tab-{id}, jadi tautannya bisa dibagikan dan
  // tahan refresh. Karena itulah id wajib unik per halaman.
  //
  // urlReplace hanya menentukan cara riwayat browser ditulis:
  //   urlReplace (bawaan) -> history.replace, tombol Back
  //                          langsung keluar dari halaman
  //   urlReplace={false}  -> history.push, tiap pergantian tab
  //                          menambah satu langkah riwayat
  <Tabs id="tagihan" defaultValue="belum-bayar" urlReplace={false}>
    ...
  </Tabs>
`);

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-gray-200 p-4">
      <Text variant="t1" className="text-gray-800">
        {children}
      </Text>
    </div>
  );
}

export default function TabsPage() {
  const [tab, setTab] = useState('akun');

  return (
    <>
      <HeroSection
        illust={illust}
        title="Navigation"
        subtitle="Tabs"
        description="Membagi konten sederajat ke beberapa panel dan menampilkan satu panel pada satu waktu."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection title="Basic" code={exampleBasic}>
            <Tabs id="tabs-basic" defaultValue="akun">
              <TabsList>
                <TabsTrigger value="akun">Akun</TabsTrigger>
                <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
                <TabsTrigger value="keamanan">Keamanan</TabsTrigger>
              </TabsList>

              <TabsContent value="akun">
                <Panel>Ubah nama, email, dan foto profil di sini.</Panel>
              </TabsContent>
              <TabsContent value="notifikasi">
                <Panel>Atur email dan notifikasi yang ingin diterima.</Panel>
              </TabsContent>
              <TabsContent value="keamanan">
                <Panel>Ganti kata sandi dan kelola perangkat aktif.</Panel>
              </TabsContent>
            </Tabs>
          </MainSection>

          <MainSection title="Dengan Ikon" code={exampleIcon}>
            <Tabs id="tabs-ikon" defaultValue="akun">
              <TabsList>
                <TabsTrigger value="akun">
                  <Icon name="user" size={16} className="mr-2" />
                  Akun
                </TabsTrigger>
                <TabsTrigger value="notifikasi">
                  <Icon name="bell" size={16} className="mr-2" />
                  Notifikasi
                </TabsTrigger>
                <TabsTrigger value="dokumen">
                  <Icon name="document" size={16} className="mr-2" />
                  Dokumen
                </TabsTrigger>
              </TabsList>

              <TabsContent value="akun">
                <Panel>Profil dan data pribadi.</Panel>
              </TabsContent>
              <TabsContent value="notifikasi">
                <Panel>Preferensi notifikasi.</Panel>
              </TabsContent>
              <TabsContent value="dokumen">
                <Panel>Berkas yang pernah diunggah.</Panel>
              </TabsContent>
            </Tabs>
          </MainSection>
        </GridWrapper>

        <MainSection title="Orientasi Vertikal" code={exampleVertical}>
          <Tabs
            id="tabs-vertikal"
            defaultValue="ringkasan"
            orientation="vertical"
          >
            <TabsList>
              <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
              <TabsTrigger value="rincian">Rincian</TabsTrigger>
              <TabsTrigger value="lampiran">Lampiran</TabsTrigger>
            </TabsList>

            <TabsContent value="ringkasan">
              <Panel>Angka utama laporan bulan ini.</Panel>
            </TabsContent>
            <TabsContent value="rincian">
              <Panel>Rincian transaksi baris per baris.</Panel>
            </TabsContent>
            <TabsContent value="lampiran">
              <Panel>Berkas pendukung laporan.</Panel>
            </TabsContent>
          </Tabs>
        </MainSection>

        <GridWrapper>
          <MainSection title="Tab Nonaktif" code={exampleDisabled}>
            <Tabs id="tabs-disabled" defaultValue="aktif">
              <TabsList>
                <TabsTrigger value="aktif">Aktif</TabsTrigger>
                <TabsTrigger value="selesai">Selesai</TabsTrigger>
                <TabsTrigger value="arsip" disabled>
                  Arsip
                </TabsTrigger>
              </TabsList>

              <TabsContent value="aktif">
                <Panel>Pekerjaan yang sedang berjalan.</Panel>
              </TabsContent>
              <TabsContent value="selesai">
                <Panel>Pekerjaan yang sudah selesai.</Panel>
              </TabsContent>
              <TabsContent value="arsip">
                <Panel>Arsip.</Panel>
              </TabsContent>
            </Tabs>
          </MainSection>

          <MainSection title="Terkendali dari Luar" code={exampleControlled}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {['akun', 'notifikasi', 'keamanan'].map((item) => (
                  <Button
                    key={item}
                    size="sm"
                    color={tab === item ? 'primary' : 'gray'}
                    variant={tab === item ? 'default' : 'outline'}
                    onClick={() => setTab(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>

              <Tabs id="tabs-terkendali" value={tab} onValueChange={setTab}>
                <TabsList>
                  <TabsTrigger value="akun">Akun</TabsTrigger>
                  <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
                  <TabsTrigger value="keamanan">Keamanan</TabsTrigger>
                </TabsList>

                <TabsContent value="akun">
                  <Panel>Tab aktif: akun</Panel>
                </TabsContent>
                <TabsContent value="notifikasi">
                  <Panel>Tab aktif: notifikasi</Panel>
                </TabsContent>
                <TabsContent value="keamanan">
                  <Panel>Tab aktif: keamanan</Panel>
                </TabsContent>
              </Tabs>
            </div>
          </MainSection>
        </GridWrapper>

        <MainSection title="Tersimpan di URL" code={exampleUrlReplace}>
          <Tabs id="tabs-url" defaultValue="belum-bayar" urlReplace={false}>
            <TabsList>
              <TabsTrigger value="belum-bayar">Belum Bayar</TabsTrigger>
              <TabsTrigger value="lunas">Lunas</TabsTrigger>
              <TabsTrigger value="jatuh-tempo">Jatuh Tempo</TabsTrigger>
            </TabsList>

            <TabsContent value="belum-bayar">
              <Panel>
                Perhatikan alamat browser saat tab diganti: muncul
                ?tab-tabs-url. Karena urlReplace={false}, tombol Back
                mengembalikan tab ke pilihan sebelumnya.
              </Panel>
            </TabsContent>
            <TabsContent value="lunas">
              <Panel>Tagihan yang sudah dibayar.</Panel>
            </TabsContent>
            <TabsContent value="jatuh-tempo">
              <Panel>Tagihan yang melewati tanggal jatuh tempo.</Panel>
            </TabsContent>
          </Tabs>
        </MainSection>

        <Footer
          title="Tabs"
          backTo="/playground/image"
          backToTitle="Image"
          nextTo="/playground/sheet"
          nextToTitle="Sheet"
        />
      </div>
    </>
  );
}
