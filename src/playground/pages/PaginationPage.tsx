import { TablePagination } from '../../clients';
import { Card, CardBody, CardHeader } from '../../components/card';
import HeroSection from '../components/HeroSection';

export default function PaginationPage() {
  return (
    <>
      <HeroSection
        title="Navigation"
        subtitle="Pagination"
        description="Memecah data yang panjang menjadi beberapa halaman agar user dapat berpindah antar bagian tanpa memuat semuanya sekaligus."
      />
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader divider>Pagination Primary</CardHeader>
          <CardBody>
            <TablePagination currentPage={1} totalPage={10} />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
