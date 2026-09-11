import dedent from 'dedent';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../components/breadcrumbs';
import illust from '../../assets/images/navigation.png';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

const ITEMS = [
  { label: 'Beranda', href: '/playground' },
  { label: 'Pengaturan', href: '/playground/breadcrumb' },
  { label: 'Profil Perusahaan' },
];

const exampleBasic = dedent(`
  import { Breadcrumbs } from '@herca/r-kit';

  <Breadcrumbs
    items={[
      { label: 'Beranda', href: '/' },
      { label: 'Pengaturan', href: '/pengaturan' },
      { label: 'Profil Perusahaan' },
    ]}
  />
`);

const exampleSeparator = dedent(`
  // Pemisah menerima nama ikon apa pun dari komponen Icon.
  <Breadcrumbs separator="angle-right-small" items={items} />
`);

const exampleTwoLevel = dedent(`
  // Item terakhir selalu dirender sebagai teks biasa,
  // karena ia mewakili halaman yang sedang dibuka.
  <Breadcrumbs
    items={[
      { label: 'Beranda', href: '/' },
      { label: 'Daftar Pengguna' },
    ]}
  />
`);

const exampleRouter = dedent(`
  import { Link } from 'react-router-dom';

  // Breadcrumbs memberi 'href' ke linkComponent, sedangkan Link
  // react-router menerima 'to' — jadi jembatani lewat adaptor kecil.
  const RouterLink = ({ href, ...props }) => <Link to={href ?? '#'} {...props} />;

  // Hasilnya navigasi berpindah tanpa memuat ulang halaman.
  <Breadcrumbs linkComponent={RouterLink} items={items} />
`);

function RouterLink({
  href,
  ...props
}: { href?: string } & Omit<React.ComponentProps<typeof Link>, 'to'>) {
  return <Link to={href ?? '#'} {...props} />;
}

export default function BreadcrumbPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Navigation"
        subtitle="Breadcrumb"
        description="Menunjukkan posisi halaman saat ini di dalam hierarki situs dan menyediakan jalan kembali ke tingkat di atasnya."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection title="Basic" code={exampleBasic}>
            <Breadcrumbs items={ITEMS} />
          </MainSection>

          <MainSection title="Dua Tingkat" code={exampleTwoLevel}>
            <Breadcrumbs
              items={[
                { label: 'Beranda', href: '/playground' },
                { label: 'Daftar Pengguna' },
              ]}
            />
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection title="Pemisah Kustom" code={exampleSeparator}>
            <div className="flex flex-col gap-3">
              <Breadcrumbs separator="angle-right-small" items={ITEMS} />
              <Breadcrumbs separator="arrow-right" items={ITEMS} />
            </div>
          </MainSection>

          <MainSection title="Dengan Router" code={exampleRouter}>
            <Breadcrumbs linkComponent={RouterLink} items={ITEMS} />
          </MainSection>
        </GridWrapper>

        <Footer
          title="Breadcrumb"
          backTo="/playground/dropdown"
          backToTitle="Dropdown"
          nextTo="/playground/pagination"
          nextToTitle="Pagination"
        />
      </div>
    </>
  );
}
