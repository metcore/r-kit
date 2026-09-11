import dedent from 'dedent';
import { Avatar } from '../../components/avatar';
import type {
  AvatarColorType,
  AvatarSizeType,
  AvatarVariantType,
} from '../../components/avatar/type';
import { Text } from '../../components/text';
import illust from '../../assets/images/data-display.png';
import fotoProfil from '../../assets/images/card-example.jpg';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

const SIZES: AvatarSizeType[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const VARIANTS: AvatarVariantType[] = ['circle', 'rounded', 'square'];
const COLORS: AvatarColorType[] = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'purple',
  'orange',
  'gray',
];

const exampleBasic = dedent(`
  import { Avatar } from '@herca/r-kit';

  // Tanpa url, Avatar menampilkan inisial dari name.
  <Avatar name="Herca Pratama" />
`);

const exampleVariant = dedent(`
  <Avatar variant="circle" name="Herca Pratama" />
  <Avatar variant="rounded" name="Herca Pratama" />
  <Avatar variant="square" name="Herca Pratama" />
`);

const exampleSize = dedent(`
  <Avatar size="xs" name="Herca Pratama" />
  <Avatar size="sm" name="Herca Pratama" />
  <Avatar size="md" name="Herca Pratama" />
  <Avatar size="lg" name="Herca Pratama" />
  <Avatar size="xl" name="Herca Pratama" />
  <Avatar size="xxl" name="Herca Pratama" />
`);

const exampleColor = dedent(`
  // Warna hanya berlaku untuk avatar inisial.
  <Avatar color="primary" name="Herca Pratama" />
  <Avatar color="success" name="Herca Pratama" />
  <Avatar color="danger" name="Herca Pratama" />
`);

const exampleImage = dedent(`
  // Dengan url, gambar menggantikan inisial.
  // name tetap dipakai sebagai teks alternatif.
  <Avatar url={fotoProfil} name="Herca Pratama" size="xl" />
`);

const exampleStack = dedent(`
  // Susun beberapa avatar dengan margin negatif
  // untuk menampilkan anggota sebuah tim.
  <div className="flex -space-x-3">
    <Avatar name="Herca Pratama" className="ring-2 ring-white" />
    <Avatar name="Siti Rahayu" color="success" className="ring-2 ring-white" />
    <Avatar name="Bagus Nugroho" color="warning" className="ring-2 ring-white" />
    <Avatar name="+5" color="gray" className="ring-2 ring-white" />
  </div>
`);

export default function AvatarPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Avatar"
        description="Mewakili identitas seseorang atau entitas lewat foto, inisial, maupun ikon pengganti."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection title="Basic" code={exampleBasic}>
            <Avatar name="Herca Pratama" />
          </MainSection>

          <MainSection title="Dengan Foto" code={exampleImage}>
            <div className="flex items-end gap-3">
              {VARIANTS.map((variant) => (
                <Avatar
                  key={variant}
                  variant={variant}
                  size="xl"
                  url={fotoProfil}
                  name="Herca Pratama"
                />
              ))}
            </div>
          </MainSection>
        </GridWrapper>

        <MainSection
          title="Varian"
          code={exampleVariant}
          contentClassName="flex flex-wrap gap-8"
        >
          {VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-2">
              <Avatar variant={variant} size="lg" name="Herca Pratama" />
              <Text variant="t2" className="text-gray-700" value={variant} />
            </div>
          ))}
        </MainSection>

        <MainSection
          title="Ukuran"
          code={exampleSize}
          contentClassName="flex flex-wrap items-end gap-6"
        >
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Avatar size={size} color="danger" name="Herca Pratama" />
              <Text variant="t2" className="text-gray-700" value={size} />
            </div>
          ))}
        </MainSection>

        <MainSection
          title="Warna"
          code={exampleColor}
          contentClassName="flex flex-wrap items-end gap-6"
        >
          {COLORS.map((color) => (
            <div key={color} className="flex flex-col items-center gap-2">
              <Avatar size="lg" color={color} name="Herca Pratama" />
              <Text variant="t2" className="text-gray-700" value={color} />
            </div>
          ))}
        </MainSection>

        <MainSection title="Tumpukan Tim" code={exampleStack}>
          <div className="flex -space-x-3">
            <Avatar name="Herca Pratama" className="ring-2 ring-white" />
            <Avatar
              name="Siti Rahayu"
              color="success"
              className="ring-2 ring-white"
            />
            <Avatar
              name="Bagus Nugroho"
              color="warning"
              className="ring-2 ring-white"
            />
            <Avatar name="+5" color="gray" className="ring-2 ring-white" />
          </div>
        </MainSection>

        <Footer
          title="Avatar"
          backTo="/playground/drawing"
          backToTitle="Drawing"
          nextTo="/playground/icons"
          nextToTitle="Icon"
        />
      </div>
    </>
  );
}
