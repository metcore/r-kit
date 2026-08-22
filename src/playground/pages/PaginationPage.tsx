import { useState } from 'react';
import dedent from 'dedent';
import { TablePagination } from '../../clients';
import illust from '../../assets/images/navigation.png';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

const exampleBasic = dedent(`
  import { TablePagination } from '@herca/r-kit/clients';

  const [page, setPage] = useState(1);

  <TablePagination
    currentPage={page}
    totalPage={10}
    numberOnClick={setPage}
    prevOnClick={() => setPage((p) => Math.max(p - 1, 1))}
    nextOnClick={() => setPage((p) => Math.min(p + 1, 10))}
  />
`);

const examplePerPage = dedent(`
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  <TablePagination
    currentPage={page}
    totalPage={20}
    selectedPerpage={perPage}
    perPages={[10, 25, 50, 100]}
    onChangePerpage={(val) => {
      setPerPage(val);
      setPage(1); // kembali ke halaman awal saat jumlah baris berubah
    }}
    numberOnClick={setPage}
  />
`);

const exampleWithoutNumber = dedent(`
  // showNumber={false} menyembunyikan nomor halaman beserta tombol
  // maju/mundurnya, menyisakan pemilih jumlah baris saja.
  <TablePagination showNumber={false} currentPage={page} totalPage={5} />
`);

const exampleNumberOnly = dedent(`
  // Sebaliknya, showController={false} membuang pemilih jumlah baris
  // dan menyisakan navigasi halaman saja.
  <TablePagination
    showController={false}
    currentPage={page}
    totalPage={5}
    numberOnClick={setPage}
    prevOnClick={() => setPage((p) => Math.max(p - 1, 1))}
    nextOnClick={() => setPage((p) => Math.min(p + 1, 5))}
  />
`);

export default function PaginationPage() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [shortPage] = useState(1);
  const [numberPage, setNumberPage] = useState(1);

  const TOTAL = 10;

  return (
    <>
      <HeroSection
        illust={illust}
        title="Navigation"
        subtitle="Pagination"
        description="Memecah data yang panjang menjadi beberapa halaman agar user dapat berpindah antar bagian tanpa memuat semuanya sekaligus."
      />

      <div className="flex flex-col gap-4">
        <MainSection title="Basic" code={exampleBasic}>
          <TablePagination
            currentPage={page}
            totalPage={TOTAL}
            numberOnClick={setPage}
            prevOnClick={() => setPage((p) => Math.max(p - 1, 1))}
            nextOnClick={() => setPage((p) => Math.min(p + 1, TOTAL))}
          />
        </MainSection>

        <MainSection title="Dengan Pilihan Jumlah Baris" code={examplePerPage}>
          <TablePagination
            currentPage={page}
            totalPage={TOTAL}
            selectedPerpage={perPage}
            perPages={[10, 25, 50, 100]}
            onChangePerpage={(val) => {
              setPerPage(val);
              setPage(1);
            }}
            numberOnClick={setPage}
            prevOnClick={() => setPage((p) => Math.max(p - 1, 1))}
            nextOnClick={() => setPage((p) => Math.min(p + 1, TOTAL))}
          />
        </MainSection>

        <GridWrapper>
          <MainSection title="Tanpa Nomor Halaman" code={exampleWithoutNumber}>
            <TablePagination
              showNumber={false}
              currentPage={shortPage}
              totalPage={5}
              selectedPerpage={perPage}
              onChangePerpage={setPerPage}
            />
          </MainSection>

          <MainSection title="Hanya Nomor Halaman" code={exampleNumberOnly}>
            <TablePagination
              showController={false}
              currentPage={numberPage}
              totalPage={5}
              numberOnClick={setNumberPage}
              prevOnClick={() => setNumberPage((p) => Math.max(p - 1, 1))}
              nextOnClick={() => setNumberPage((p) => Math.min(p + 1, 5))}
            />
          </MainSection>
        </GridWrapper>

        <Footer
          title="Pagination"
          backTo="/playground/breadcrumb"
          backToTitle="Breadcrumb"
          nextTo="/playground/sidebar"
          nextToTitle="Sidebar"
        />
      </div>
    </>
  );
}
