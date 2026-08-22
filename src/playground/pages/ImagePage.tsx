import dedent from 'dedent';
import { Image } from '../../components/image';
import { Text } from '../../components/text';
import illust from '../../assets/images/data-display.png';
import contoh from '../../assets/images/card-example.jpg';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

// Placeholder buram: SVG gradien mungil yang diperbesar dan diblur
// oleh komponen selagi gambar asli belum selesai dimuat.
const BLUR_DATA_URL =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5'%3E%3Cdefs%3E%3ClinearGradient id='g'%3E%3Cstop offset='0%25' stop-color='%23c2a68a'/%3E%3Cstop offset='100%25' stop-color='%235b7c99'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='8' height='5' fill='url(%23g)'/%3E%3C/svg%3E";

const exampleBasic = dedent(`
  import { Image } from '@herca/r-kit';

  // width dan height wajib diisi bila fill tidak dipakai.
  // Keduanya jadi dasar srcSet dan mencegah layout bergeser.
  <Image
    src="/foto-produk.jpg"
    alt="Foto produk"
    width={640}
    height={400}
  />
`);

const exampleFill = dedent(`
  // fill membuat gambar mengisi penuh induknya secara absolut,
  // jadi induknya wajib punya position: relative dan tinggi tetap.
  <div className="relative h-56 w-full overflow-hidden rounded-lg">
    <Image fill src="/foto-produk.jpg" alt="Foto produk" />
  </div>
`);

const exampleBlur = dedent(`
  // placeholder="blur" menampilkan blurDataURL selagi gambar dimuat,
  // lalu memudar begitu gambar asli siap.
  <Image
    src="/foto-produk.jpg"
    alt="Foto produk"
    width={640}
    height={400}
    placeholder="blur"
    blurDataURL={BLUR_DATA_URL}
  />
`);

const examplePriority = dedent(`
  // priority menyisipkan <link rel="preload"> dan memuat gambar
  // secara eager. Pakai hanya untuk gambar utama di layar pertama.
  <Image priority src="/hero.jpg" alt="Banner" width={1200} height={600} />
`);

const exampleQuality = dedent(`
  // quality diteruskan ke loader (bawaannya 75).
  // Tanpa loader kustom, nilainya tidak mengubah apa pun.
  <Image src="/foto.jpg" alt="Foto" width={640} height={400} quality={40} />
`);

const exampleLoader = dedent(`
  import { Image, cloudinaryLoader } from '@herca/r-kit';

  // loader menentukan URL akhir untuk setiap lebar di srcSet.
  // Kit menyediakan cloudinaryLoader, imgixLoader, dan selfHostedLoader.
  <Image
    loader={cloudinaryLoader}
    src="folder/foto-produk.jpg"
    alt="Foto produk"
    width={640}
    height={400}
  />

  // Atau tulis sendiri:
  const loaderSaya = ({ src, width, quality }) =>
    \`https://cdn.herca.id\${src}?w=\${width}&q=\${quality ?? 75}\`;
`);

const exampleSizes = dedent(`
  // sizes memberi tahu browser lebar tampil gambar per breakpoint,
  // sehingga ia memilih kandidat srcSet yang paling hemat.
  <Image
    src="/foto.jpg"
    alt="Foto"
    width={640}
    height={400}
    sizes="(max-width: 768px) 100vw, 33vw"
  />
`);

export default function ImagePage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Image"
        description="Menampilkan gambar dengan srcSet otomatis, placeholder buram, dan pratinjau ukuran penuh saat diklik."
      />

      <div className="flex flex-col gap-4">
        <MainSection
          title="Basic"
          code={exampleBasic}
          contentClassName="flex flex-col gap-3"
        >
          <div className="max-w-md">
            <Image src={contoh} alt="Contoh gambar" width={640} height={400} />
          </div>
          <Text
            variant="t2"
            className="text-gray-700"
            value="Klik gambar untuk membuka pratinjau ukuran penuh."
          />
        </MainSection>

        <GridWrapper>
          <MainSection title="Mengisi Penuh (fill)" code={exampleFill}>
            <div className="relative h-56 w-full overflow-hidden rounded-lg">
              <Image fill src={contoh} alt="Contoh gambar" />
            </div>
          </MainSection>

          <MainSection title="Placeholder Buram" code={exampleBlur}>
            <div className="flex flex-col gap-3">
              <Image
                src={contoh}
                alt="Contoh gambar"
                width={640}
                height={400}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              <Text
                variant="t2"
                className="text-gray-700"
                value="Buramnya hanya sekejap karena gambar ini sudah ada di cache."
              />
            </div>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection title="Prioritas Muat" code={examplePriority}>
            <Image
              priority
              src={contoh}
              alt="Contoh gambar"
              width={640}
              height={400}
            />
          </MainSection>

          <MainSection title="Kualitas" code={exampleQuality}>
            <div className="flex flex-col gap-3">
              <Image
                src={contoh}
                alt="Contoh gambar"
                width={640}
                height={400}
                quality={40}
              />
              <Text
                variant="t2"
                className="text-gray-700"
                value="quality baru berpengaruh bila loader kustom memakainya."
              />
            </div>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection title="Loader Kustom" code={exampleLoader}>
            <Text variant="t1" className="text-gray-800">
              Tanpa loader, komponen memakai src apa adanya. Dengan loader,
              setiap kandidat srcSet dibangun ulang lewat CDN pilihan Anda.
            </Text>
          </MainSection>

          <MainSection title="Atribut sizes" code={exampleSizes}>
            <Image
              src={contoh}
              alt="Contoh gambar"
              width={640}
              height={400}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </MainSection>
        </GridWrapper>

        <Footer
          title="Image"
          backTo="/playground/progress-bar"
          backToTitle="Progress Bar"
          nextTo="/playground/tabs"
          nextToTitle="Tabs"
        />
      </div>
    </>
  );
}
