import dedent from 'dedent';
import illust from '../../assets/images/rainbow.png';
import MainSection from '../components/MainSection';
import { Text } from '../../components/text';
import { Button } from '../../components/button';
import { useCopy } from '../../hooks/use-copy';
import { cn } from '../../lib/utils';
import useColors from '../hooks/useColors';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

const examplePakai = dedent(`
  // Setiap warna tersedia sebagai utility Tailwind.
  // Polanya: {properti}-{keluarga}-{tingkat}
  <div className="bg-primary-500 text-white">...</div>
  <p className="text-danger-500">Terjadi kesalahan</p>
  <div className="border border-gray-200">...</div>

  // Komponen kit memakai nama keluarga lewat prop color.
  <Button color="primary">Simpan</Button>
  <Badge color="success">Aktif</Badge>
  <Alert color="warning" title="Kuota hampir habis" />
`);

const exampleKeluarga = (keluarga: string) =>
  dedent(`
  <div className="bg-${keluarga}-500" />
  <p className="text-${keluarga}-700">Teks</p>
  <div className="border-${keluarga}-200" />
`);

const exampleDefault = dedent(`
  // Hitam dan putih dipakai lewat opacity, bukan tingkat warna.
  <div className="bg-black" />
  <div className="bg-black/60" />
  <div className="bg-white" />
  <div className="bg-white/60" />
`);

const exampleDivider = dedent(`
  // Garis pemisah memakai hitam dengan opasitas rendah
  // agar tetap menyatu di atas latar apa pun.
  <div className="border-b border-black/13" />
  <div className="border-b border-black/38" />
`);

export default function ColorsPage() {
  const {
    primaryColors,
    warningColors,
    successColors,
    infoColors,
    defaultColors,
    grayColors,
    dangerColors,
    purpleColors,
    dividerColors,
    orangeColors,
  } = useColors();

  const FAMILIES = [
    { title: 'Gray', slug: 'gray', colors: grayColors },
    { title: 'Primary', slug: 'primary', colors: primaryColors },
    { title: 'Warning', slug: 'warning', colors: warningColors },
    { title: 'Danger', slug: 'danger', colors: dangerColors },
    { title: 'Success', slug: 'success', colors: successColors },
    { title: 'Info', slug: 'info', colors: infoColors },
    { title: 'Orange', slug: 'orange', colors: orangeColors },
    { title: 'Purple', slug: 'purple', colors: purpleColors },
  ];

  return (
    <>
      <HeroSection
        illust={illust}
        title="Foundation"
        subtitle="Color"
        description="Warna digunakan secara sengaja untuk menunjukkan fungsi elemen, hubungan antar elemen, serta tingkat prioritas atau penekanan dalam interface."
      />

      <div className="flex flex-col gap-4">
        <MainSection title="Cara Pakai" code={examplePakai}>
          <div className="flex flex-wrap gap-3">
            <Button color="primary">Primary</Button>
            <Button color="success">Success</Button>
            <Button color="danger">Danger</Button>
            <Button color="warning">Warning</Button>
            <Button color="info">Info</Button>
          </div>
        </MainSection>

        <MainSection title="Default" code={exampleDefault}>
          <div className="flex flex-row flex-wrap items-center gap-8">
            {defaultColors.map((color, index) => (
              <CardColor
                key={`${color.name}-${color.percentage ?? index}`}
                percentage={color.percentage}
                color={color.hexa}
                name={color.name}
                className="border border-gray-500"
              />
            ))}
          </div>
        </MainSection>

        {FAMILIES.map((family) => (
          <MainSection
            key={family.slug}
            title={family.title}
            code={exampleKeluarga(family.slug)}
          >
            <div className="flex flex-row flex-wrap items-center gap-8">
              {family.colors.map((color) => (
                <CardColor
                  key={`${family.slug}-${color.name}`}
                  color={color.hexa}
                  name={`${family.slug}-${color.name}`}
                  className="border border-gray-500"
                />
              ))}
            </div>
          </MainSection>
        ))}

        <MainSection title="Divider" code={exampleDivider}>
          <div className="flex flex-row flex-wrap items-center gap-8">
            {dividerColors.map((color, index) => (
              <CardColor
                key={color.title}
                color={color.hexa}
                name={color.title}
                percentage={color.percentage}
                className={cn(
                  'border border-gray-500',
                  index === 0 && 'opacity-13',
                  index === 1 && 'opacity-38'
                )}
              />
            ))}
          </div>
        </MainSection>

        <Footer
          title="Color"
          backTo="/playground/typography"
          backToTitle="Typography"
          nextTo="/playground/checkbox"
          nextToTitle="Checkbox"
        />
      </div>
    </>
  );
}

const CardColor = ({
  className,
  percentage,
  color,
  name,
}: {
  className?: string;
  percentage?: string;
  color: string;
  name: string;
}) => {
  const { copy, copied } = useCopy();

  return (
    <button
      type="button"
      onClick={() => void copy(color)}
      title={`Salin ${color}`}
      className="flex cursor-pointer flex-col items-start gap-4 text-left"
    >
      <div
        className={cn('h-28 w-28 rounded-sm border', className)}
        style={{ backgroundColor: color }}
      />
      <div className="flex w-28 flex-col">
        <Text value={name} weight="semibold" variant="t2" />
        <div className="flex flex-row items-center justify-between">
          <Text
            value={copied ? 'Tersalin!' : color}
            weight="medium"
            variant="t3"
            className="text-gray-700"
          />
          {percentage !== undefined && (
            <Text
              value={percentage}
              weight="medium"
              variant="t3"
              className="text-gray-700"
            />
          )}
        </div>
      </div>
    </button>
  );
};
