import { useMemo, useState } from 'react';
import dedent from 'dedent';
import { Input } from '../../../clients';
import { Icon, type IconNameProps } from '../../../components/icons';
import { iconRegistry } from '../../../components/icons/icon-registry';
import { Text } from '../../../components/text';
import { useCopy } from '../../../hooks/use-copy';
import illust from '../../../assets/images/typography.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';

const ICON_NAMES = Object.keys(iconRegistry) as IconNameProps[];

const exampleBasic = dedent(`
  import { Icon } from '@herca/r-kit';

  <Icon name="search" />
`);

const exampleSize = dedent(`
  // size dalam piksel, bawaannya 24.
  <Icon name="bell" size={16} />
  <Icon name="bell" size={24} />
  <Icon name="bell" size={32} />
  <Icon name="bell" size={48} />
`);

const exampleColor = dedent(`
  // Bawaannya currentColor, jadi ikon ikut warna teks induknya.
  <span className="text-danger-500">
    <Icon name="flag" />
  </span>

  // Atau tentukan sendiri lewat prop color.
  <Icon name="flag" color="#f04438" />
`);

const exampleInline = dedent(`
  <Button className="gap-2" color="primary">
    <Icon name="plus" size={16} />
    Tambah Data
  </Button>
`);

const exampleRegistry = dedent(`
  import { iconRegistry, type IconNameProps } from '@herca/r-kit';

  // Seluruh nama ikon tersedia sebagai kunci iconRegistry,
  // sehingga daftarnya bisa dibangun dan disaring sendiri.
  const NAMA_IKON = Object.keys(iconRegistry) as IconNameProps[];

  const hasil = NAMA_IKON.filter((n) => n.includes(kataKunci));
`);

const SIZES = [16, 24, 32, 48];

export default function IconPage() {
  const [search, setSearch] = useState('');
  const { copy, copied } = useCopy();
  const [lastCopied, setLastCopied] = useState<string | null>(null);

  const filteredIcons = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (keyword === '') return ICON_NAMES;
    return ICON_NAMES.filter((name) => name.toLowerCase().includes(keyword));
  }, [search]);

  const handleCopy = (name: IconNameProps) => {
    void copy(`<Icon name="${name}" />`);
    setLastCopied(name);
  };

  return (
    <>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Icon"
        description="Simbol ringkas yang memperkuat makna sebuah aksi atau label tanpa menambah banyak teks."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection title="Ukuran" code={exampleSize}>
            <div className="flex flex-wrap items-end gap-6">
              {SIZES.map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Icon name="bell" size={size} />
                  <Text
                    variant="t2"
                    className="text-gray-700"
                    value={`${size}px`}
                  />
                </div>
              ))}
            </div>
          </MainSection>

          <MainSection title="Warna" code={exampleColor}>
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-primary-1000">
                <Icon name="flag" size={28} />
              </span>
              <span className="text-danger-500">
                <Icon name="flag" size={28} />
              </span>
              <span className="text-success-500">
                <Icon name="flag" size={28} />
              </span>
              <Icon name="flag" size={28} color="#f79009" />
            </div>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection title="Basic" code={exampleBasic}>
            <Icon name="search" />
          </MainSection>

          <MainSection title="Di Dalam Komponen Lain" code={exampleInline}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-primary-1000 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white">
                <Icon name="plus" size={16} />
                Tambah Data
              </span>
              <span className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900">
                <Icon name="download" size={16} />
                Unduh
              </span>
            </div>
          </MainSection>
        </GridWrapper>

        <MainSection
          title={`Daftar Ikon (${filteredIcons.length} dari ${ICON_NAMES.length})`}
          code={exampleRegistry}
          contentClassName="flex flex-col gap-4"
        >
          <Input
            mergedAddon
            placeholder="Cari nama ikon..."
            leftAddonClassName="pr-0!"
            leftAddon={<Icon name="search" size={18} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredIcons.length === 0 ? (
            <Text
              variant="t1"
              className="py-8 text-center text-gray-700"
              value={`Tidak ada ikon yang cocok dengan "${search}".`}
            />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {filteredIcons.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleCopy(name)}
                  title={`Salin <Icon name="${name}" />`}
                  className="hover:border-primary-500 hover:bg-primary-50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-gray-200 px-2 py-3 transition-colors"
                >
                  <Icon name={name} />
                  <span className="w-full truncate text-center text-xs text-gray-700">
                    {copied && lastCopied === name ? 'Tersalin!' : name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </MainSection>

        <Footer
          title="Icon"
          backTo="/playground/avatar"
          backToTitle="Avatar"
          nextTo="/playground/timeline"
          nextToTitle="Timeline"
        />
      </div>
    </>
  );
}
