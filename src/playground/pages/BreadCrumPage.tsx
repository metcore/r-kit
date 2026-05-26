import { Breadcrumbs } from '../../components/breadcrumbs';
import { Card, CardBody, CardHeader } from '../../components/card';
import HeroSection from '../components/HeroSection';

export default function BreadcrumbPage() {
  return (
    <>
      <HeroSection
        title="Breadcrumb"
        subtitle="navigation"
        description="Panel yang muncul dari bawah atau samping untuk menampilkan navigasi tambahan tanpa meninggalkan halaman utama."
      />

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader divider>Breadcrumb</CardHeader>
          <CardBody>
            <Breadcrumbs
              items={[
                {
                  label: 'Page 1',
                  href: '/',
                },
                {
                  label: 'Page 2',
                  href: '/tickets/projecrs',
                },
                {
                  label: 'Page 1',
                },
              ]}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
