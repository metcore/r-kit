import dedent from 'dedent';
import {
  Checkbox,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownPanel,
  DropdownSeparator,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
  DropdownTrigger,
  Input,
} from '../../clients';
import { Button } from '../../components/button';
import { ButtonIcon } from '../../components/button-icon/button-icon';
import { Icon } from '../../components/icons';
import { Kbd } from '../../components/kbd';
import { Text } from '../../components/text';
import illust from '../../assets/images/navigation.png';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

const exampleBasic = dedent(`
  import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    DropdownSeparator,
  } from '@herca/r-kit/clients';

  <Dropdown>
    <DropdownTrigger>
      <Button color="primary">Aksi</Button>
    </DropdownTrigger>

    <DropdownContent>
      <DropdownItem>Lihat detail</DropdownItem>
      <DropdownItem>Duplikat</DropdownItem>
      <DropdownSeparator />
      <DropdownItem>Hapus</DropdownItem>
    </DropdownContent>
  </Dropdown>
`);

const exampleIcon = dedent(`
  // Item menerima konten bebas, termasuk ikon dan pintasan papan tik.
  <DropdownItem>
    <Icon name="pencil" size={16} />
    Ubah
    <Kbd size="sm">E</Kbd>
  </DropdownItem>
`);

const exampleTrigger = dedent(`
  // Pemicu bisa komponen apa pun karena DropdownTrigger memakai asChild.
  <DropdownTrigger>
    <ButtonIcon icon="more-horizontal" variant="tertiary" />
  </DropdownTrigger>
`);

const exampleLink = dedent(`
  // Beri href agar item dirender sebagai tautan sungguhan,
  // sehingga bisa dibuka di tab baru lewat klik tengah.
  <DropdownItem href="/pengguna/12">Lihat profil</DropdownItem>
`);

const exampleDisabled = dedent(`
  // disabled mematikan item tanpa menghilangkannya dari daftar.
  <DropdownItem disabled>Arsipkan</DropdownItem>
`);

const exampleSub = dedent(`
  import { DropdownSub, DropdownSubTrigger, DropdownSubContent } from '@herca/r-kit/clients';

  <DropdownSub>
    <DropdownSubTrigger>
      <div className="flex w-full items-center justify-between gap-2 px-3 py-2">
        Pindahkan ke
        <Icon name="angle-right-small" size={16} />
      </div>
    </DropdownSubTrigger>

    <DropdownSubContent>
      <DropdownItem>Proyek A</DropdownItem>
      <DropdownItem>Proyek B</DropdownItem>
    </DropdownSubContent>
  </DropdownSub>
`);

const examplePanel = dedent(`
  // DropdownPanel menampung konten bebas seperti form pendek,
  // tanpa gaya item yang bisa diklik.
  <DropdownContent>
    <DropdownPanel className="flex w-64 flex-col gap-2">
      <Input label="Email" placeholder="nama@herca.id" />
      <Input label="Kata sandi" type="password" />
      <Checkbox label="Ingat saya" />
      <Button>Masuk</Button>
    </DropdownPanel>

    <DropdownSeparator />
    <DropdownItem>Lupa kata sandi?</DropdownItem>
  </DropdownContent>
`);

const examplePosisi = dedent(`
  // align: start | center | end · side: top | right | bottom | left
  <DropdownContent align="end" side="bottom" sideOffset={8}>
    ...
  </DropdownContent>
`);

function MenuAksi() {
  return (
    <DropdownContent>
      <DropdownItem>Lihat detail</DropdownItem>
      <DropdownItem>Duplikat</DropdownItem>
      <DropdownSeparator />
      <DropdownItem>Hapus</DropdownItem>
    </DropdownContent>
  );
}

export default function DropdownPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Navigation"
        subtitle="Dropdown"
        description="Menyembunyikan sekumpulan aksi atau pilihan di balik satu pemicu, sehingga layar tetap lapang sampai user membutuhkannya."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection title="Basic" code={exampleBasic}>
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary">Aksi</Button>
              </DropdownTrigger>
              <MenuAksi />
            </Dropdown>
          </MainSection>

          <MainSection title="Dengan Ikon & Pintasan" code={exampleIcon}>
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="outline">
                  Dokumen
                </Button>
              </DropdownTrigger>
              <DropdownContent className="w-56">
                <DropdownItem className="justify-between">
                  <span className="flex items-center gap-2">
                    <Icon name="pencil" size={16} />
                    Ubah
                  </span>
                  <Kbd size="sm">E</Kbd>
                </DropdownItem>
                <DropdownItem className="justify-between">
                  <span className="flex items-center gap-2">
                    <Icon name="download" size={16} />
                    Unduh
                  </span>
                  <Kbd size="sm">D</Kbd>
                </DropdownItem>
                <DropdownItem className="justify-between">
                  <span className="flex items-center gap-2">
                    <Icon name="share" size={16} />
                    Bagikan
                  </span>
                  <Kbd size="sm">
                    <Icon name="arrow-turn-down-left" size={12} />
                  </Kbd>
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </MainSection>
        </GridWrapper>

        <MainSection
          title="Ragam Pemicu"
          code={exampleTrigger}
          contentClassName="relative z-0 flex flex-wrap items-center gap-3"
        >
          {(
            ['primary', 'secondary', 'success', 'danger', 'warning'] as const
          ).map((color) => (
            <Dropdown key={color}>
              <DropdownTrigger>
                <Button color={color}>{color}</Button>
              </DropdownTrigger>
              <MenuAksi />
            </Dropdown>
          ))}

          <Dropdown>
            <DropdownTrigger>
              <ButtonIcon icon="more-horizontal" variant="tertiary" />
            </DropdownTrigger>
            <MenuAksi />
          </Dropdown>
        </MainSection>

        <GridWrapper>
          <MainSection title="Item Sebagai Tautan" code={exampleLink}>
            <Dropdown>
              <DropdownTrigger>
                <Button color="warning">Buka</Button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem href="/playground/dropdown">
                  Lihat profil
                </DropdownItem>
                <DropdownItem href="/playground/dropdown">
                  Riwayat aktivitas
                </DropdownItem>
                <DropdownItem href="/playground/dropdown">
                  Pengaturan akun
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </MainSection>

          <MainSection title="Item Nonaktif" code={exampleDisabled}>
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="outline">
                  Kelola
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem>Ubah</DropdownItem>
                <DropdownItem disabled>Arsipkan</DropdownItem>
                <DropdownSeparator />
                <DropdownItem disabled>Hapus permanen</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection title="Submenu" code={exampleSub}>
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="outline">
                  Berkas
                </Button>
              </DropdownTrigger>
              <DropdownContent className="w-56">
                <DropdownItem>Ganti nama</DropdownItem>

                <DropdownSub>
                  <DropdownSubTrigger>
                    <div className="hover:bg-primary-50 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none">
                      Pindahkan ke
                      <Icon name="angle-right-small" size={16} />
                    </div>
                  </DropdownSubTrigger>

                  <DropdownSubContent className="flex flex-col gap-1">
                    <DropdownItem>Proyek Alpha</DropdownItem>
                    <DropdownItem>Proyek Beta</DropdownItem>
                    <DropdownItem>Arsip 2025</DropdownItem>
                  </DropdownSubContent>
                </DropdownSub>

                <DropdownSeparator />
                <DropdownItem>Hapus</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </MainSection>

          <MainSection title="Panel Berisi Form" code={examplePanel}>
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary">Masuk</Button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownPanel className="flex w-64 flex-col gap-2">
                  <Input label="Email" placeholder="nama@herca.id" />
                  <Input label="Kata sandi" type="password" />
                  <Checkbox label="Ingat saya" />
                  <Button>Masuk</Button>
                </DropdownPanel>
                <DropdownSeparator />
                <DropdownItem>Lupa kata sandi?</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </MainSection>
        </GridWrapper>

        <MainSection
          title="Posisi"
          code={examplePosisi}
          contentClassName="relative z-0 flex flex-wrap items-center gap-3"
        >
          {(['start', 'center', 'end'] as const).map((align) => (
            <Dropdown key={align}>
              <DropdownTrigger>
                <Button color="gray" variant="outline">
                  {`align="${align}"`}
                </Button>
              </DropdownTrigger>
              <DropdownContent align={align}>
                <DropdownItem>Lihat detail</DropdownItem>
                <DropdownItem>Duplikat</DropdownItem>
              </DropdownContent>
            </Dropdown>
          ))}

          {(['top', 'right'] as const).map((side) => (
            <Dropdown key={side}>
              <DropdownTrigger>
                <Button color="gray" variant="outline">
                  {`side="${side}"`}
                </Button>
              </DropdownTrigger>
              <DropdownContent side={side}>
                <DropdownItem>Lihat detail</DropdownItem>
                <DropdownItem>Duplikat</DropdownItem>
              </DropdownContent>
            </Dropdown>
          ))}

          <Text
            variant="t2"
            className="w-full text-gray-700"
            value="Menu dirender lewat portal, jadi ia selalu tampil di atas kartu maupun sheet."
          />
        </MainSection>

        <Footer
          title="Dropdown"
          backTo="/playground/sheet"
          backToTitle="Sheet"
          nextTo="/playground/breadcrumb"
          nextToTitle="Breadcrumb"
        />
      </div>
    </>
  );
}
