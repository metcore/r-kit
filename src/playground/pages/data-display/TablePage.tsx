/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  ButtonIcon,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
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
import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import HeroSection from '../../components/HeroSection';

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
      phone: '62xxxx',
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
        <MainSection title="Table Basic" className="overflow-auto">
          <Table responsive={true} className="w-full table-auto">
            <TableHead>
              <TableRow>
                <TableCellHead value={'No'} />
                <TableCellHead value={'Nama'} />
                <TableCellHead value={'Username'} />
                <TableCellHead value={'Status'} />
                <TableCellHead value={'Phone'} />
                <TableCellHead value={'Divisi'} />
                <TableCellHead value={'Divisi'} />
              </TableRow>
            </TableHead>
            <TableBody>
              {sample_data.map((item, index) => (
                <TableRow
                  key={index}
                  isLast={index === sample_data.length - index}
                >
                  <TableCell
                    value={index + 1}
                    textClassName="text-gray-800"
                    className="hidden md:table-cell"
                  />
                  <TableCell
                    value={item.name}
                    textClassName="text-gray-800 "
                    className="max-md:flex max-md:items-center"
                  />
                  <TableCell
                    value={item.username}
                    textClassName="text-gray-800"
                    className="col-span-2"
                  />
                  <TableCell className="col-span-2">
                    <Badge color={status_map[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell value={item.phone} textClassName="text-gray-800" />
                  <TableCell
                    value={item.divisi}
                    className="col-span-2"
                    textClassName="text-gray-800"
                  />
                  <TableCell className="max-md:col-start-2 max-md:row-start-1 max-md:flex max-md:min-w-0 max-md:flex-col max-md:items-end">
                    <Dropdown>
                      <DropdownTrigger>
                        <ButtonIcon variant="tertiary" icon="more-horizontal" />
                      </DropdownTrigger>
                      <DropdownContent>dd</DropdownContent>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MainSection>
        <MainSection title="Table Head" className="overflow-auto">
          <Table responsive className="w-full table-auto">
            <TableHead className="bg-gray-100">
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
                <TableRow
                  key={index}
                  isLast={index === sample_data.length - index}
                >
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
        <MainSection title="Bordered Table" className="overflow-auto">
          <Table bordered className="w-full table-auto">
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
        <MainSection title="Stripped Rows" className="overflow-auto">
          <Table striped bordered responsive className="w-full table-auto">
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
        <MainSection title="Hovered" className="overflow-auto">
          <Table striped bordered hoverable className="w-full table-auto">
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
        <MainSection title="Advanced Table" className="overflow-auto">
          <Table className="w-full table-auto">
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

        <MainSection title="pagination">
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
      </div>
    </>
  );
}
