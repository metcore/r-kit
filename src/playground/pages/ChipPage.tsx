import { useState } from 'react';
import dedent from 'dedent';
import {
  Chip,
  ChipGroup,
  type ChipOptionProps,
  type ChipValue,
} from '../../components/chip';
import { Icon } from '../../components/icons';
import { Text } from '../../components/text';
import illust from '../../assets/images/data-display.png';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

const TEKNOLOGI: ChipOptionProps[] = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nodejs', label: 'Node.js', disabled: true },
];

const STATUS: ChipOptionProps[] = [
  { value: 'draft', label: 'Draf' },
  { value: 'review', label: 'Ditinjau' },
  { value: 'approved', label: 'Disetujui' },
  { value: 'rejected', label: 'Ditolak' },
];

const SIZES = ['sm', 'md', 'lg'] as const;
const COLORS = [
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'purple',
  'orange',
  'gray',
] as const;

const exampleSingle = dedent(`
  import { Chip } from '@herca/r-kit';

  const [selected, setSelected] = useState(false);

  <Chip
    value="react"
    selected={selected}
    onClick={() => setSelected((s) => !s)}
  >
    React
  </Chip>
`);

const exampleMultiple = dedent(`
  import { ChipGroup } from '@herca/r-kit';

  const [selected, setSelected] = useState<ChipValue[]>([]);

  // multiple membuat lebih dari satu chip bisa aktif bersamaan.
  <ChipGroup
    multiple
    color="success"
    options={TEKNOLOGI}
    selected={selected}
    onSelect={setSelected}
  />
`);

const exampleSingleGroup = dedent(`
  // Tanpa multiple, memilih chip lain akan menggantikan pilihan sebelumnya.
  <ChipGroup
    color="primary"
    options={STATUS}
    selected={selected}
    onSelect={setSelected}
  />
`);

const exampleSize = dedent(`
  <ChipGroup size="sm" options={STATUS} />
  <ChipGroup size="md" options={STATUS} />
  <ChipGroup size="lg" options={STATUS} />
`);

const exampleColor = dedent(`
  // Chip yang sedang terpilih memakai warna dari prop color.
  <ChipGroup color="primary" options={STATUS} selected={['draft']} />
  <ChipGroup color="danger" options={STATUS} selected={['draft']} />
`);

const exampleIcon = dedent(`
  // Setiap opsi boleh membawa ikon sendiri.
  const OPSI = [
    { value: 'draft', label: 'Draf', icon: <Icon name="document" size={14} /> },
    { value: 'approved', label: 'Disetujui', icon: <Icon name="check" size={14} /> },
  ];

  <ChipGroup options={OPSI} selected={selected} onSelect={setSelected} />
`);

const exampleDismissible = dedent(`
  // dismissible menambahkan tombol silang di setiap chip.
  <ChipGroup
    dismissible
    options={options}
    onDismiss={(value) =>
      setOptions((prev) => prev.filter((o) => o.value !== value))
    }
  />
`);

const exampleVertical = dedent(`
  <ChipGroup direction="vertical" options={STATUS} />
`);

export default function ChipPage() {
  const [single, setSingle] = useState(false);
  const [multiple, setMultiple] = useState<ChipValue[]>(['react']);
  const [status, setStatus] = useState<ChipValue[]>(['review']);
  const [berikon, setBerikon] = useState<ChipValue[]>(['approved']);
  const [dismissible, setDismissible] = useState<ChipOptionProps[]>(TEKNOLOGI);

  const OPSI_IKON: ChipOptionProps[] = [
    {
      value: 'draft',
      label: 'Draf',
      icon: <Icon name="document" size={14} />,
    },
    {
      value: 'review',
      label: 'Ditinjau',
      icon: <Icon name="eye" size={14} />,
    },
    {
      value: 'approved',
      label: 'Disetujui',
      icon: <Icon name="check" size={14} />,
    },
  ];

  return (
    <>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Chip"
        description="Label ringkas yang dapat dipilih untuk menyaring, menandai, atau mewakili sebuah pilihan."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection title="Chip Tunggal" code={exampleSingle}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <Chip
                  value="react"
                  selected={single}
                  onClick={() => setSingle((s) => !s)}
                >
                  React
                </Chip>
                <Chip value="disabled" disabled>
                  Nonaktif
                </Chip>
              </div>
              <Text
                variant="t2"
                className="text-gray-700"
                value={single ? 'Terpilih' : 'Belum dipilih'}
              />
            </div>
          </MainSection>

          <MainSection title="Dengan Ikon" code={exampleIcon}>
            <ChipGroup
              options={OPSI_IKON}
              selected={berikon}
              onSelect={setBerikon}
              color="primary"
            />
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection title="Pilih Banyak" code={exampleMultiple}>
            <div className="flex flex-col gap-3">
              <ChipGroup
                multiple
                color="success"
                options={TEKNOLOGI}
                selected={multiple}
                onSelect={setMultiple}
              />
              <Text
                variant="t2"
                className="text-gray-700"
                value={
                  multiple.length > 0
                    ? `Terpilih: ${multiple.join(', ')}`
                    : 'Belum ada yang dipilih'
                }
              />
            </div>
          </MainSection>

          <MainSection title="Pilih Satu" code={exampleSingleGroup}>
            <div className="flex flex-col gap-3">
              <ChipGroup
                color="primary"
                options={STATUS}
                selected={status}
                onSelect={setStatus}
              />
              <Text
                variant="t2"
                className="text-gray-700"
                value={
                  status.length > 0
                    ? `Terpilih: ${status.join(', ')}`
                    : 'Belum ada yang dipilih'
                }
              />
            </div>
          </MainSection>
        </GridWrapper>

        <MainSection
          title="Ukuran"
          code={exampleSize}
          contentClassName="flex flex-col gap-4"
        >
          {SIZES.map((size) => (
            <div key={size} className="flex items-center gap-3">
              <Text variant="t2" className="w-8 text-gray-700" value={size} />
              <ChipGroup size={size} options={STATUS} selected={['review']} />
            </div>
          ))}
        </MainSection>

        <MainSection
          title="Warna"
          code={exampleColor}
          contentClassName="flex flex-col gap-3"
        >
          {COLORS.map((color) => (
            <div key={color} className="flex items-center gap-3">
              <Text variant="t2" className="w-20 text-gray-700" value={color} />
              <ChipGroup
                color={color}
                options={STATUS}
                selected={['review', 'approved']}
                multiple
              />
            </div>
          ))}
        </MainSection>

        <GridWrapper>
          <MainSection title="Bisa Dihapus" code={exampleDismissible}>
            <div className="flex flex-col gap-3">
              <ChipGroup
                dismissible
                options={dismissible}
                onDismiss={(value) =>
                  setDismissible((prev) =>
                    prev.filter((item) => item.value !== value)
                  )
                }
              />
              {dismissible.length === 0 && (
                <button
                  type="button"
                  onClick={() => setDismissible(TEKNOLOGI)}
                  className="text-info-500 cursor-pointer self-start text-sm underline"
                >
                  Kembalikan semua chip
                </button>
              )}
            </div>
          </MainSection>

          <MainSection title="Arah Vertikal" code={exampleVertical}>
            <ChipGroup
              direction="vertical"
              options={STATUS}
              selected={['approved']}
            />
          </MainSection>
        </GridWrapper>

        <Footer
          title="Chip"
          backTo="/playground/card"
          backToTitle="Card"
          nextTo="/playground/modal"
          nextToTitle="Modal"
        />
      </div>
    </>
  );
}
