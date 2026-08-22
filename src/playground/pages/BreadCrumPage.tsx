import { Breadcrumbs } from '../../components/breadcrumbs';
import { Card, CardBody, CardHeader } from '../../components/card';
import HeroSection from '../components/HeroSection';

export default function BreadcrumbPage() {
  return (
    <>
      <HeroSection
        title="Navigation"
        subtitle="Breadcrumb"
        description="Menunjukkan posisi halaman saat ini di dalam hierarki situs dan menyediakan jalan kembali ke tingkat di atasnya."
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
