import { useState } from 'react';
import dedent from 'dedent';

import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import illust from '../../assets/images/typography.png';

import { Button } from '../../components/button';
import { Text } from '../../components/text';
import {
  Checkbox,
  CheckboxGroup,
  type CheckboxValue,
  Counter,
  DatePicker,
  DayOfMonthPicker,
  DayPicker,
  Input,
  InputGroup,
  InputGroupControl,
  InputGroupText,
  MonthPicker,
  Radio,
  RadioGroup,
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
  Slider,
  Switch,
  Textarea,
  TimePicker,
  YearPicker,
  type DateRange,
  type RadioButtonValue,
  type SelectOption,
} from '../../clients';

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'invoice', label: 'Invoice' },
  { value: 'purchase-order', label: 'Purchase Order' },
  { value: 'delivery-note', label: 'Delivery Note' },
  { value: 'receipt', label: 'Receipt' },
];

const STATUS_OPTIONS: SelectOption[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'waiting', label: 'Menunggu Approval' },
  { value: 'approved', label: 'Disetujui' },
  { value: 'rejected', label: 'Ditolak' },
];

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

const sheetAdvancedSearchCode = dedent(`
  import { useState } from 'react';
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
    Input,
    Select,
    DatePicker,
    TimePicker,
    Textarea,
    RadioGroup,
    Radio,
    Switch,
    Checkbox,
    CheckboxGroup,
    Counter,
    MonthPicker,
    YearPicker,
    DayPicker,
    DayOfMonthPicker,
    InputGroup,
    InputGroupText,
    InputGroupControl,
    Slider,
    Button,
  } from '@herca/r-kit/clients';

  export default function AdvancedSearch() {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState(null);
    const [range, setRange] = useState({ start: null, end: null });
    const [sort, setSort] = useState('newest');
    const [sources, setSources] = useState(['internal']);
    const [amount, setAmount] = useState([0, 50]);
    const [minItem, setMinItem] = useState('1');
    const [onlyMine, setOnlyMine] = useState(false);

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Advanced Search</Button>
        </SheetTrigger>

        {/* Body-nya scroll, footer aksi tetap menempel di bawah. */}
        <SheetContent side="right" size="md">
          <SheetHeader>
            <SheetTitle>Advanced Search</SheetTitle>
            <SheetDescription>
              Persempit hasil pencarian lewat filter di bawah.
            </SheetDescription>
          </SheetHeader>

          <SheetBody className="gap-4">
            <Input
              label="Kata Kunci"
              icon="search"
              placeholder="Nomor dokumen, nama, atau catatan"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <Select
              label="Kategori"
              className="w-full"
              options={CATEGORY_OPTIONS}
              value={category}
              onChange={setCategory}
              placeholder="Semua kategori"
            />

            <CheckboxGroup
              label="Sumber Data"
              direction="horizontal"
              value={sources}
              onValueChange={setSources}
            >
              <Checkbox value="internal" label="Internal" />
              <Checkbox value="vendor" label="Vendor" />
              <Checkbox value="import" label="Import" />
            </CheckboxGroup>

            <DatePicker
              label="Rentang Tanggal"
              mode="range"
              format="DD-MM-YYYY"
              isClearable
              rangeValue={range}
              onRangeChange={setRange}
            />

            <div className="grid grid-cols-2 gap-3">
              <TimePicker label="Jam Mulai" placeholder="00:00" />
              <TimePicker label="Jam Selesai" placeholder="23:59" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MonthPicker label="Periode Bulan" placeholder="Bulan" />
              <YearPicker label="Tahun Anggaran" placeholder="Tahun" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <DayPicker label="Hari Transaksi" placeholder="Hari" />
              <DayOfMonthPicker
                label="Tanggal Jatuh Tempo"
                placeholder="Tanggal"
              />
            </div>

            <InputGroup label="Nilai Minimum">
              <InputGroupText>Rp</InputGroupText>
              <InputGroupControl>
                <Input placeholder="0" inputMode="numeric" />
              </InputGroupControl>
            </InputGroup>

            <Slider
              range
              label="Rentang Nilai (juta)"
              min={0}
              max={100}
              step={5}
              value={amount}
              onChange={setAmount}
            />

            <Counter value={minItem} onChange={setMinItem} />

            <RadioGroup label="Urutkan" value={sort} onValueChange={setSort}>
              <Radio value="newest" label="Terbaru" />
              <Radio value="oldest" label="Terlama" />
              <Radio value="amount" label="Nilai terbesar" />
            </RadioGroup>

            <Textarea
              clearAble
              label="Catatan"
              placeholder="Kata kunci tambahan pada catatan dokumen"
              hint="Opsional. Dicocokkan sebagian."
            />

            <Switch
              label="Hanya dokumen milik saya"
              checked={onlyMine}
              onCheckedChange={setOnlyMine}
            />
          </SheetBody>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Reset</Button>
            </SheetClose>
            <Button>Terapkan Filter</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
`);

export default function SheetPage() {
  const [selectedUser, setSelectedUser] = useState<SelectOption | null>(null);
  const [controlledOpen, setControlledOpen] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchCategory, setSearchCategory] = useState<SelectOption | null>(
    null
  );
  const [searchStatus, setSearchStatus] = useState<SelectOption | null>(null);
  const [searchRange, setSearchRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [searchSort, setSearchSort] = useState<RadioButtonValue>('newest');
  const [searchSources, setSearchSources] = useState<CheckboxValue[]>([
    'internal',
  ]);
  const [searchMonth, setSearchMonth] = useState<number[]>([]);
  const [searchYear, setSearchYear] = useState<number[]>([]);
  const [searchDay, setSearchDay] = useState<number[]>([]);
  const [searchDueDate, setSearchDueDate] = useState<number[]>([]);
  const [searchAmount, setSearchAmount] = useState<[number, number]>([0, 50]);
  const [minItem, setMinItem] = useState('1');
  const [onlyMine, setOnlyMine] = useState(false);

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

        {/* 7. Advanced Search */}
        <MainSection title="Advanced Search" code={sheetAdvancedSearchCode}>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Advanced Search</Button>
            </SheetTrigger>

            <SheetContent side="right" size="md">
              <SheetHeader>
                <SheetTitle>Advanced Search</SheetTitle>
                <SheetDescription>
                  Persempit hasil pencarian lewat filter di bawah.
                </SheetDescription>
              </SheetHeader>

              <SheetBody className="gap-4">
                <Input
                  label="Kata Kunci"
                  icon="search"
                  placeholder="Nomor dokumen, nama, atau catatan"
                  value={searchKeyword}
                  onChange={(event) => setSearchKeyword(event.target.value)}
                />

                <Select
                  label="Kategori"
                  className="w-full"
                  options={CATEGORY_OPTIONS}
                  value={searchCategory}
                  onChange={(v) => setSearchCategory(v as SelectOption | null)}
                  placeholder="Semua kategori"
                />

                <Select
                  label="Status"
                  className="w-full"
                  options={STATUS_OPTIONS}
                  value={searchStatus}
                  onChange={(v) => setSearchStatus(v as SelectOption | null)}
                  placeholder="Semua status"
                />

                <CheckboxGroup
                  label="Sumber Data"
                  direction="horizontal"
                  value={searchSources}
                  onValueChange={setSearchSources}
                >
                  <Checkbox value="internal" label="Internal" />
                  <Checkbox value="vendor" label="Vendor" />
                  <Checkbox value="import" label="Import" />
                </CheckboxGroup>

                <DatePicker
                  label="Rentang Tanggal"
                  mode="range"
                  format="DD-MM-YYYY"
                  isClearable
                  rangeValue={searchRange}
                  onRangeChange={setSearchRange}
                />

                <div className="grid grid-cols-2 gap-3">
                  <TimePicker label="Jam Mulai" placeholder="00:00" />
                  <TimePicker label="Jam Selesai" placeholder="23:59" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <MonthPicker
                    label="Periode Bulan"
                    placeholder="Bulan"
                    defaultValue={searchMonth}
                    onChange={(value) =>
                      setSearchMonth(Array.isArray(value) ? value : [])
                    }
                  />
                  <YearPicker
                    label="Tahun Anggaran"
                    placeholder="Tahun"
                    defaultValue={searchYear}
                    onChange={(value) =>
                      setSearchYear(Array.isArray(value) ? value : [])
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <DayPicker
                    label="Hari Transaksi"
                    placeholder="Hari"
                    defaultValue={searchDay}
                    onChange={(value) =>
                      setSearchDay(Array.isArray(value) ? value : [])
                    }
                  />
                  <DayOfMonthPicker
                    label="Tanggal Jatuh Tempo"
                    placeholder="Tanggal"
                    defaultValue={searchDueDate}
                    onChange={(value) =>
                      setSearchDueDate(Array.isArray(value) ? value : [])
                    }
                  />
                </div>

                <InputGroup label="Nilai Minimum">
                  <InputGroupText>Rp</InputGroupText>
                  <InputGroupControl>
                    <Input placeholder="0" inputMode="numeric" />
                  </InputGroupControl>
                </InputGroup>

                <Slider
                  range
                  label="Rentang Nilai (juta)"
                  min={0}
                  max={100}
                  step={5}
                  value={searchAmount}
                  onChange={setSearchAmount}
                  hint={`Rp${searchAmount[0]} jt - Rp${searchAmount[1]} jt`}
                />

                <div className="flex flex-col gap-1">
                  <Text
                    variant="t2"
                    weight="semibold"
                    className="text-gray-900"
                    value="Minimal Jumlah Item"
                  />
                  <Counter value={minItem} onChange={setMinItem} />
                </div>

                <RadioGroup
                  label="Urutkan"
                  value={searchSort}
                  onValueChange={setSearchSort}
                >
                  <Radio value="newest" label="Terbaru" />
                  <Radio value="oldest" label="Terlama" />
                  <Radio value="amount" label="Nilai terbesar" />
                </RadioGroup>

                <Textarea
                  clearAble
                  label="Catatan"
                  placeholder="Kata kunci tambahan pada catatan dokumen"
                  hint="Opsional. Dicocokkan sebagian."
                />

                <Switch
                  label="Hanya dokumen milik saya"
                  checked={onlyMine}
                  onCheckedChange={setOnlyMine}
                />
              </SheetBody>

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Reset</Button>
                </SheetClose>
                <Button>Terapkan Filter</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
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
