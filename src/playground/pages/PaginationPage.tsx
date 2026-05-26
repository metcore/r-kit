import { TablePagination } from '../../clients';
import { Card, CardBody, CardHeader } from '../../components/card';
import HeroSection from '../components/HeroSection';

export default function PaginationPage() {
  return (
    <>
      <HeroSection
        title="navigation"
        subtitle="Pagination"
        description="Panel yang muncul dari bawah atau samping untuk menampilkan navigasi tambahan tanpa meninggalkan halaman utama."
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
