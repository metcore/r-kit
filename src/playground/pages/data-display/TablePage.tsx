/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import dedent from 'dedent';
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '../../../clients';
import { Badge } from '../../../components/badge';
import { Text } from '../../../components/text';
import illust from '../../../assets/images/data-display.png';
import MainSection from '../../components/MainSection';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';

const exampleBasic = dedent(`
  import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCellHead,
    TableCell,
  } from '@herca/r-kit/clients';

  <Table variant="row-bordered" className="w-full table-auto">
    <TableHead>
      <TableRow>
        <TableCellHead value="Nama" />
        <TableCellHead value="Status" />
      </TableRow>
    </TableHead>

    <TableBody>
      {data.map((item, index) => (
        <TableRow key={item.username} isLast={index === data.length - 1}>
          <TableCell value={item.name} />
          <TableCell>
            <Badge color={statusMap[item.status]}>{item.status}</Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
`);

const exampleHeaded = dedent(`
  // variant="headed" memberi latar abu pada baris kepala.
  // Tandai barisnya dengan isHeader agar gayanya ikut menyesuaikan.
  <Table variant="headed">
    <TableHead>
      <TableRow isHeader>...</TableRow>
    </TableHead>
    ...
  </Table>
`);

const exampleBordered = dedent(`
  // variant="bordered" memberi garis pada seluruh sisi sel.
  <Table variant="bordered">...</Table>
`);

const exampleStripped = dedent(`
  // variant="stripped" memberi latar belang-seling per baris,
  // memudahkan mata mengikuti baris yang panjang.
  <Table variant="stripped">...</Table>
`);

const exampleHovered = dedent(`
  // variant="hovered" menyorot baris yang sedang disentuh kursor.
  <Table variant="hovered">...</Table>
`);

const exampleAdvanced = dedent(`
  // TableFooter menampung paginasi agar menyatu dengan tabel.
  <Table variant="wrapped-row-bordered">
    <TableHead>...</TableHead>
    <TableBody>...</TableBody>

    <TableFooter colSpan={6}>
      <TablePagination
        currentPage={page}
        totalPage={lastPage}
        numberOnClick={setPage}
      />
    </TableFooter>
  </Table>
`);

const examplePagination = dedent(`
  // TablePagination juga bisa berdiri sendiri di luar tabel.
  <TablePagination
    currentPage={page}
    totalPage={lastPage}
    selectedPerpage={perPage}
    onChangePerpage={(val) => {
      setPerPage(val);
      setPage(1); // kembali ke halaman awal saat jumlah baris berubah
    }}
    numberOnClick={setPage}
    prevOnClick={() => setPage((p) => Math.max(p - 1, 1))}
    nextOnClick={() => setPage((p) => Math.min(p + 1, lastPage))}
  />
`);

export default function TablePage() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState<any[]>([]);
  const [lastPage, setLastPage] = useState(1);

  const sample_data = [
    {
      name: 'Cody Fisher',
      username: 'codex',
      status: 'active',
      phone: '6281298765432',
      divisi: 'SuperAdmin',
    },
    {
      name: 'Esther Howard',
      username: 'estherh',
      status: 'inactive',
      phone: '6281234567890',
      divisi: 'Finance',
    },
    {
      name: 'Wade Warren',
      username: 'wadew',
      status: 'active',
      phone: '6289876543210',
      divisi: 'Marketing',
    },
    {
      name: 'Jenny Wilson',
      username: 'jennyw',
      status: 'pending',
      phone: '6281122334455',
      divisi: 'HR',
    },
    {
      name: 'Robert Fox',
      username: 'robfox',
      status: 'active',
      phone: '6285566778899',
      divisi: 'IT',
    },
  ];

  const status_map: any = {
    active: 'success',
    pending: 'warning',
    inactive: 'danger',
  };

  const getDummyData = async (pageParam = page, perPageParam = perPage) => {
    const skip = (pageParam - 1) * perPageParam;

    try {
      const res = await fetch(
        `https://dummyjson.com/users?limit=${perPageParam}&skip=${skip}`
      );

      const json = await res.json();

      const laravelLikeData = {
        current_page: pageParam,
        data: json.users,
        per_page: perPageParam,
        total: json.total,
        last_page: Math.ceil(json.total / perPageParam),
      };

      setData(laravelLikeData.data);
      setLastPage(laravelLikeData.last_page);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    void getDummyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage]);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Data Display"
        subtitle="Table"
        description="Struktur data yang menampilkan informasi dalam format baris dan kolom untuk mendukung pemahaman dan interaksi user."
      />

      <div className="flex flex-col gap-4">
        <MainSection
          title="Table Basic"
          code={exampleBasic}
          className="overflow-auto"
        >
          <Table variant="row-bordered" className="w-full table-auto">
            <TableHead>
              <TableRow>
                <TableCellHead value={'No'} />
                <TableCellHead value={'Nama'} />
                <TableCellHead value={'Username'} />
                <TableCellHead value={'Status'} />
                <TableCellHead value={'Phone'} />
                <TableCellHead value={'Divisi'} />
              </TableRow>
            </TableHead>
            <TableBody>
              {sample_data.map((item, index) => (
                <TableRow key={index} isLast={index === sample_data.length - 1}>
                  <TableCell value={index + 1} textClassName="text-gray-800" />
                  <TableCell
                    value={item.name}
                    textClassName="text-gray-800"
                    className="min-w-30"
                  />
                  <TableCell
                    value={item.username}
                    textClassName="text-gray-800"
                  />
                  <TableCell>
                    <Badge color={status_map[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell value={item.phone} textClassName="text-gray-800" />
                  <TableCell
                    value={item.divisi}
                    textClassName="text-gray-800"
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MainSection>
        <MainSection
          title="Table Head"
          code={exampleHeaded}
          className="overflow-auto"
        >
          <Table variant="headed" className="w-full table-auto">
            <TableHead>
              <TableRow isHeader>
                <TableCellHead value={'No'} />
                <TableCellHead value={'Nama'} />
                <TableCellHead value={'Username'} />
                <TableCellHead value={'Status'} />
                <TableCellHead value={'Phone'} />
                <TableCellHead value={'Divisi'} />
              </TableRow>
            </TableHead>
            <TableBody>
              {sample_data.map((item, index) => (
                <TableRow key={index} isLast={index === sample_data.length - 1}>
                  <TableCell value={index + 1} textClassName="text-gray-800" />
                  <TableCell textClassName="text-gray-800">
                    <a href="#">
                      <Text
                        value={item.name}
                        variant="t2"
                        className="text-info-500"
                      />
                    </a>
                  </TableCell>
                  <TableCell
                    value={item.username}
                    textClassName="text-gray-800"
                  />
                  <TableCell>
                    <Badge color={status_map[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell value={item.phone} textClassName="text-gray-800" />
                  <TableCell
                    value={item.divisi}
                    textClassName="text-gray-800"
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MainSection>
        <MainSection
          title="Bordered Table"
          code={exampleBordered}
          className="overflow-auto"
        >
          <Table variant="bordered" className="w-full table-auto">
            <TableHead>
              <TableRow>
                <TableCellHead value={'No'} />
                <TableCellHead value={'Nama'} />
                <TableCellHead value={'Username'} />
                <TableCellHead value={'Status'} />
                <TableCellHead value={'Phone'} />
                <TableCellHead value={'Divisi'} />
              </TableRow>
            </TableHead>
            <TableBody>
              {sample_data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell value={index + 1} textClassName="text-gray-800" />
                  <TableCell
                    value={item.name}
                    textClassName="text-gray-800"
                    className="min-w-30"
                  />
                  <TableCell
                    value={item.username}
                    textClassName="text-gray-800"
                  />
                  <TableCell>
                    <Badge color={status_map[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell value={item.phone} textClassName="text-gray-800" />
                  <TableCell
                    value={item.divisi}
                    textClassName="text-gray-800"
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MainSection>
        <MainSection
          title="Stripped Rows"
          code={exampleStripped}
          className="overflow-auto"
        >
          <Table variant="stripped" className="w-full table-auto">
            <TableHead>
              <TableRow isHeader>
                <TableCellHead value={'No'} />
                <TableCellHead value={'Nama'} />
                <TableCellHead value={'Username'} />
                <TableCellHead value={'Status'} />
                <TableCellHead value={'Phone'} />
                <TableCellHead value={'Divisi'} />
              </TableRow>
            </TableHead>
            <TableBody>
              {sample_data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell value={index + 1} textClassName="text-gray-800" />
                  <TableCell
                    value={item.name}
                    textClassName="text-gray-800"
                    className="min-w-30"
                  />
                  <TableCell
                    value={item.username}
                    textClassName="text-gray-800"
                  />
                  <TableCell>
                    <Badge color={status_map[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell value={item.phone} textClassName="text-gray-800" />
                  <TableCell
                    value={item.divisi}
                    textClassName="text-gray-800"
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MainSection>
        <MainSection
          title="Hovered"
          code={exampleHovered}
          className="overflow-auto"
        >
          <Table variant="hovered" className="w-full table-auto">
            <TableHead>
              <TableRow isHeader>
                <TableCellHead value={'No'} />
                <TableCellHead value={'Nama'} />
                <TableCellHead value={'Username'} />
                <TableCellHead value={'Status'} />
                <TableCellHead value={'Phone'} />
                <TableCellHead value={'Divisi'} />
              </TableRow>
            </TableHead>
            <TableBody>
              {sample_data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell value={index + 1} textClassName="text-gray-800" />
                  <TableCell
                    value={item.name}
                    textClassName="text-gray-800"
                    className="min-w-30"
                  />
                  <TableCell
                    value={item.username}
                    textClassName="text-gray-800"
                  />
                  <TableCell>
                    <Badge color={status_map[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell value={item.phone} textClassName="text-gray-800" />
                  <TableCell
                    value={item.divisi}
                    textClassName="text-gray-800"
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MainSection>
        <MainSection
          title="Advanced Table"
          code={exampleAdvanced}
          className="overflow-auto"
        >
          <Table variant="wrapped-row-bordered" className="w-full table-auto">
            <TableHead>
              <TableRow isHeader>
                <TableCellHead value={'No'} />
                <TableCellHead
                  value={'Nama'}
                  onClick={() => console.log('ok')}
                />
                <TableCellHead value={'Username'} />
                <TableCellHead value={'Status'} />
                <TableCellHead value={'Phone'} />
                <TableCellHead value={'Divisi'} />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell value={(page - 1) * perPage + index + 1} />
                  <TableCell value={`${item.firstName} ${item.lastName}`} />
                  <TableCell value={item.username} />
                  <TableCell value={item.gender} />
                  <TableCell value={item.phone} />
                  <TableCell value={item.company?.department} />
                </TableRow>
              ))}
            </TableBody>
            <TableFooter colSpan={6}>
              <TablePagination
                currentPage={page}
                totalPage={lastPage}
                onChangePerpage={(val) => {
                  setPerPage(val);
                  setPage(1); // reset ke page 1
                }}
                selectedPerpage={perPage}
                numberOnClick={(p) => setPage(p)}
                prevOnClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                nextOnClick={() =>
                  setPage((prev) => Math.min(prev + 1, lastPage))
                }
              />
            </TableFooter>
          </Table>
        </MainSection>

        <MainSection title="Pagination" code={examplePagination}>
          <TablePagination
            currentPage={page}
            totalPage={lastPage}
            onChangePerpage={(val) => {
              setPerPage(val);
              setPage(1); // reset ke page 1
            }}
            selectedPerpage={perPage}
            numberOnClick={(p) => setPage(p)}
            prevOnClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            nextOnClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
          />
        </MainSection>

        <Footer
          title="Table"
          backTo="/playground/list"
          backToTitle="List"
          nextTo="/playground/api-table"
          nextToTitle="API Table"
        />
      </div>
    </>
  );
}
