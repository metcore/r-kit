import { useState } from 'react';
import dedent from 'dedent';

import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import illust from '../../assets/images/typography.png';

import { Button } from '../../components/button';
import { Text } from '../../components/text';
import {
  Select,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  type SelectOption,
} from '../../clients';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;
const SHEET_SIZES = ['sm', 'md', 'lg', 'xl', 'full'] as const;

const USER_OPTIONS: SelectOption[] = [
  { value: 1, label: 'John' },
  { value: 2, label: 'Jane' },
  { value: 3, label: 'Michael' },
  { value: 4, label: 'Emily' },
  { value: 5, label: 'David' },
  { value: 6, label: 'Sarah' },
  { value: 7, label: 'Robert' },
  { value: 8, label: 'Linda' },
];

const sheetBasic = dedent(`
  import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetBody,
    SheetFooter,
    SheetClose,
    Button,
  } from '@herca/r-kit/clients';

  export default function Page() {
    return (
      <Sheet>
        {/* asChild WAJIB: tanpa ini <button> bersarang di dalam <button>. */}
        <SheetTrigger asChild>
          <Button>Open Sheet</Button>
        </SheetTrigger>

        <SheetContent side="right" size="md">
          <SheetHeader>
            <SheetTitle>Title Sheet</SheetTitle>
            <SheetDescription>Deskripsi singkat.</SheetDescription>
          </SheetHeader>

          <SheetBody>
            <p>Konten utama sheet.</p>
          </SheetBody>

          <SheetFooter>
            <SheetClose asChild>
              <Button>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
`);

const sheetSidesCode = dedent(`
  {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <Button>Sheet {side}</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Sheet {side}</SheetTitle>
        </SheetHeader>
        <SheetBody>Panel muncul dari sisi {side}.</SheetBody>
      </SheetContent>
    </Sheet>
  ))}
`);

const sheetSizesCode = dedent(`
  {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
    <Sheet key={size}>
      <SheetTrigger asChild>
        <Button>Size {size}</Button>
      </SheetTrigger>
      {/* side dikunci ke 'right' supaya yang berubah hanya lebar. */}
      <SheetContent side="right" size={size}>
        <SheetHeader>
          <SheetTitle>Size {size}</SheetTitle>
        </SheetHeader>
        <SheetBody>Lebar mengikuti size = {size}.</SheetBody>
      </SheetContent>
    </Sheet>
  ))}
`);

const sheetScrollableCode = dedent(`
  <Sheet>
    <SheetTrigger asChild>
      <Button>Open</Button>
    </SheetTrigger>

    <SheetContent side="right" size="md">
      <SheetHeader>
        <SheetTitle>User Profile</SheetTitle>
        <SheetDescription>Header & footer tetap, body scroll.</SheetDescription>
      </SheetHeader>

      <SheetBody>
        <Select options={USER_OPTIONS} placeholder="Pilih user…" />
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i}>Baris konten ke-{i + 1}</p>
        ))}
      </SheetBody>

      {/* Footer di-pin ke bawah (shrink-0). */}
      <SheetFooter>
        <SheetClose asChild>
          <Button>Cancel</Button>
        </SheetClose>
        <Button>Save</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
`);

const sheetUrlCode = dedent(`
  <Sheet id="user-profile">
    <SheetTrigger asChild>
      <Button>Open (URL synced)</Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>URL Synced</SheetTitle>
      </SheetHeader>
      <SheetBody>Perhatikan address bar.</SheetBody>
    </SheetContent>
  </Sheet>

  <Sheet id="settings" urlReplace>
    {/* ... */}
  </Sheet>

  const href = useSheetHref('user-profile'); 
`);

const sheetControlledCode = dedent(`
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dari luar</Button>

      {/* Controlled: tidak butuh SheetTrigger. */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Controlled Sheet</SheetTitle>
          </SheetHeader>
          <SheetBody>State dikendalikan parent.</SheetBody>
          <SheetFooter>
            <Button onClick={() => setOpen(false)}>Continue</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
`);

export default function SheetPage() {
  const [selectedUser, setSelectedUser] = useState<SelectOption | null>(null);
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Navigation"
        subtitle="Sheet"
        description="Panel yang muncul dari samping atau atas/bawah untuk menampilkan konten tambahan tanpa meninggalkan halaman utama."
      />

      <div className="flex flex-col gap-4">
        <MainSection title="Sheet" code={sheetBasic}>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Open Sheet</Button>
            </SheetTrigger>
            <SheetContent side="right" size="md">
              <SheetHeader>
                <SheetTitle>Title Sheet</SheetTitle>
                <SheetDescription>Deskripsi singkat sheet.</SheetDescription>
              </SheetHeader>
              <SheetBody>
                <Text>
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs.
                </Text>
              </SheetBody>
              <SheetFooter>
                <SheetClose asChild>
                  <Button>Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </MainSection>

        <MainSection title="Side" code={sheetSidesCode}>
          <div className="flex flex-wrap gap-4">
            {SHEET_SIDES.map((side) => (
              <Sheet key={side}>
                <SheetTrigger asChild>
                  <Button>Sheet {side}</Button>
                </SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Sheet {side}</SheetTitle>
                    <SheetDescription>
                      Panel muncul dari sisi {side}.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetBody>
                    <Text>Konten untuk sheet sisi {side}.</Text>
                  </SheetBody>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button>Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </MainSection>

        <MainSection title="Size" code={sheetSizesCode}>
          <div className="flex flex-wrap gap-4">
            {SHEET_SIZES.map((size) => (
              <Sheet key={size}>
                <SheetTrigger asChild>
                  <Button>Size {size}</Button>
                </SheetTrigger>
                <SheetContent side="right" size={size}>
                  <SheetHeader>
                    <SheetTitle>Size {size}</SheetTitle>
                    <SheetDescription>
                      Lebar mengikuti size {size}.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetBody>
                    <Text>Konten sheet dengan size {size}.</Text>
                  </SheetBody>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button>Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </MainSection>

        {/* 4. Scrollable body + fixed footer */}
        <MainSection
          title="Scrollable Body + Fixed Footer"
          code={sheetScrollableCode}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button>Open Long Sheet</Button>
            </SheetTrigger>
            <SheetContent side="right" size="md">
              <SheetHeader>
                <SheetTitle>User Profile</SheetTitle>
                <SheetDescription>
                  Body scroll saat konten panjang, footer tetap di bawah.
                </SheetDescription>
              </SheetHeader>
              <SheetBody>
                <Select
                  className="w-full"
                  value={selectedUser}
                  options={USER_OPTIONS}
                  onChange={(v) => setSelectedUser(v as SelectOption | null)}
                  placeholder="Cari & pilih user…"
                />
                {Array.from({ length: 12 }).map((_, i) => (
                  <Text key={i}>
                    {i + 1}. Lorem ipsum, or lipsum as it is sometimes known, is
                    dummy text used in laying out print, graphic or web designs.
                  </Text>
                ))}
              </SheetBody>
              <SheetFooter>
                <SheetClose asChild>
                  <Button>Cancel</Button>
                </SheetClose>
                <Button>Save</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </MainSection>

        {/* 5. URL synced */}
        <MainSection title="URL Synced" code={sheetUrlCode}>
          <div className="flex flex-wrap gap-4">
            <Sheet id="user-profile">
              <SheetTrigger asChild>
                <Button>Open (URL synced)</Button>
              </SheetTrigger>
              <SheetContent side="right" size="md">
                <SheetHeader>
                  <SheetTitle>URL Synced Sheet</SheetTitle>
                  <SheetDescription>
                    Cek address bar: ?sheet-user-profile=1
                  </SheetDescription>
                </SheetHeader>
                <SheetBody>
                  <Text>
                    Refresh halaman: sheet tetap terbuka karena state ada di
                    URL, bukan di memori komponen.
                  </Text>
                </SheetBody>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Sheet id="settings" urlReplace>
              <SheetTrigger asChild>
                <Button>Open (urlReplace)</Button>
              </SheetTrigger>
              <SheetContent side="right" size="md">
                <SheetHeader>
                  <SheetTitle>urlReplace</SheetTitle>
                  <SheetDescription>
                    Tidak menambah entry history.
                  </SheetDescription>
                </SheetHeader>
                <SheetBody>
                  <Text>
                    Dengan urlReplace, tombol back langsung ke halaman
                    sebelumnya tanpa menutup sheet ini dulu.
                  </Text>
                </SheetBody>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </MainSection>

        {/* 6. Controlled */}
        <MainSection title="Controlled" code={sheetControlledCode}>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setControlledOpen(true)}>
              Open dari luar
            </Button>
          </div>
          <Sheet open={controlledOpen} onOpenChange={setControlledOpen}>
            <SheetContent side="right" size="md">
              <SheetHeader>
                <SheetTitle>Controlled Sheet</SheetTitle>
                <SheetDescription>State dikendalikan parent.</SheetDescription>
              </SheetHeader>
              <SheetBody>
                <Text>
                  Dibuka lewat state, bukan SheetTrigger — berguna untuk membuka
                  panel setelah aksi async (mis. submit berhasil).
                </Text>
              </SheetBody>
              <SheetFooter>
                <Button onClick={() => setControlledOpen(false)}>
                  Continue
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </MainSection>
      </div>
    </>
  );
}
