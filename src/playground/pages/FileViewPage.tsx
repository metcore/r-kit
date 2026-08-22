import dedent from 'dedent';
import { FileView } from '../../components/file-view';
import illust from '../../assets/images/data-display.png';
import sampleImage from '../../assets/images/card-example.jpg';
import samplePdf from '../../assets/doc/sample.pdf';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

const MB = 1024 * 1024;

const exampleBasic = dedent(`
  import { FileView } from '@herca/r-kit';

  // Jenis berkas ditebak dari ekstensi src, jadi ikon dan
  // pratinjaunya menyesuaikan sendiri.
  <FileView src="laporan-tahunan.pdf" size={2411724} />
`);

const exampleKinds = dedent(`
  <FileView src="laporan-tahunan.pdf" size={2411724} />
  <FileView src="rekap-absensi.xlsx" size={845000} />
  <FileView src="data-mentah.csv" size={102400} />
  <FileView src="notulen-rapat.docx" size={68000} />
  <FileView src="rekaman-rapat.mp3" size={7340032} />
  <FileView src="demo-produk.mp4" size={24117248} />
`);

const exampleImage = dedent(`
  // Berkas gambar menampilkan pratinjaunya langsung.
  <FileView src={fotoProduk} size={1258291} />
`);

const exampleSmall = dedent(`
  // variant="small" untuk daftar berkas yang padat.
  <FileView variant="small" src="laporan-tahunan.pdf" size={2411724} />
`);

const exampleColor = dedent(`
  // color mengubah aksen kartu, berguna untuk menandai
  // kategori atau status berkas.
  <FileView color="primary" src="kontrak.pdf" size={512000} />
  <FileView color="danger" src="kontrak.pdf" size={512000} />
  <FileView color="success" src="kontrak.pdf" size={512000} />
`);

const exampleCustomName = dedent(`
  // name menimpa nama yang diambil dari src.
  <FileView
    name="Kontrak Kerja Sama 2026"
    src="a8f3c1e9-kontrak-final-v3.pdf"
    size={512000}
  />
`);

const exampleNoDownload = dedent(`
  // Sembunyikan tombol unduh bila berkas hanya boleh dilihat.
  <FileView hideDownloadButton src="slip-gaji.pdf" size={128000} />
`);

const DOCUMENTS = [
  { src: 'laporan-tahunan.pdf', size: 2.3 * MB },
  { src: 'rekap-absensi.xlsx', size: 0.8 * MB },
  { src: 'data-mentah.csv', size: 0.1 * MB },
  { src: 'notulen-rapat.docx', size: 0.07 * MB },
  { src: 'rekaman-rapat.mp3', size: 7 * MB },
  { src: 'demo-produk.mp4', size: 23 * MB },
];

const COLORS = [
  'primary',
  'info',
  'success',
  'warning',
  'danger',
  'purple',
] as const;

export default function FileViewPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Data Display"
        subtitle="File View"
        description="Menampilkan berkas terunggah beserta nama, jenis, dan ukurannya, lengkap dengan aksi pratinjau dan unduh."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection title="Basic" code={exampleBasic}>
            <div className="max-w-60">
              <FileView src="laporan-tahunan.pdf" size={2.3 * MB} />
            </div>
          </MainSection>

          <MainSection title="Dengan Pratinjau Gambar" code={exampleImage}>
            <div className="max-w-60">
              <FileView
                src={sampleImage}
                name="foto-produk.jpg"
                size={1.2 * MB}
              />
            </div>
          </MainSection>
        </GridWrapper>

        <MainSection
          title="Jenis Berkas"
          code={exampleKinds}
          contentClassName="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {DOCUMENTS.map((doc) => (
            <FileView key={doc.src} src={doc.src} size={doc.size} />
          ))}
        </MainSection>

        <MainSection
          title="Varian Small"
          code={exampleSmall}
          contentClassName="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {DOCUMENTS.map((doc) => (
            <FileView
              key={doc.src}
              variant="small"
              src={doc.src}
              size={doc.size}
            />
          ))}
        </MainSection>

        <MainSection
          title="Warna Aksen"
          code={exampleColor}
          contentClassName="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {COLORS.map((color) => (
            <FileView
              key={color}
              variant="small"
              color={color}
              src="kontrak.pdf"
              size={0.5 * MB}
            />
          ))}
        </MainSection>

        <GridWrapper>
          <MainSection title="Nama Kustom" code={exampleCustomName}>
            <div className="max-w-60">
              <FileView
                name="Kontrak Kerja Sama 2026"
                src={samplePdf}
                size={0.5 * MB}
              />
            </div>
          </MainSection>

          <MainSection title="Tanpa Tombol Unduh" code={exampleNoDownload}>
            <div className="max-w-60">
              <FileView
                hideDownloadButton
                src="slip-gaji.pdf"
                size={0.12 * MB}
              />
            </div>
          </MainSection>
        </GridWrapper>

        <Footer
          title="File View"
          backTo="/playground/dnd"
          backToTitle="Drag and Drop"
          nextTo="/playground/example/profile"
          nextToTitle="Profile"
        />
      </div>
    </>
  );
}
