import { Badge } from '../../../components/badge';
import { Card, CardBody } from '../../../components/card';

import { Icon } from '../../../components/icons';
import illust from '../../assets/images/navigation.png';
import Footer from '../../components/Footer';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { useMarkdown } from '../../hooks/useMarkdown';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function BadgePage() {
  const { doc } = useMarkdown('/docs/badge.md');

  const example = `<div>
    <Badge color="primary">Primary</Badge>
    <Badge color="secondary">Secondary</Badge>
    <Badge color="success">Success</Badge>
    <Badge color="danger">Danger</Badge>
    <Badge color="warning">Warning</Badge>
    <Badge color="info">Info</Badge>
    <Badge color="orange">Orange</Badge>
    <Badge color="purple">Purple</Badge>
    <Badge color="gray">Gray</Badge>
  </div>`;

  const exampleIcon = `<div>
    <Badge color="primary" className="flex items-center">
      <Icon name="clock" size={16} /> Primary
    </Badge>
    <Badge color="secondary" className="flex items-center">
      <Icon name="clock" size={16} /> Secondary
    </Badge>
    <Badge color="success" className="flex items-center">
      <Icon name="clock" size={16} /> Success
    </Badge>
    <Badge color="danger" className="flex items-center">
      <Icon name="clock" size={16} /> Danger
    </Badge>
    <Badge color="warning" className="flex items-center">
      <Icon name="clock" size={16} /> Warning
    </Badge>
    <Badge color="info" className="flex items-center">
      <Icon name="clock" size={16} /> Info
    </Badge>
    <Badge color="orange" className="flex items-center">
      <Icon name="clock" size={16} /> Orange
    </Badge>
    <Badge color="purple" className="flex items-center">
      <Icon name="clock" size={16} /> Purple
    </Badge>
    <Badge color="gray" className="flex items-center">
      <Icon name="clock" size={16} /> Gray
    </Badge>
  </div>`;

  const exampleSize = `<div>
      <Badge size={'sm'} color="primary">
        Badge sm
      </Badge>
      <Badge size={'md'} color="danger">
        Badge md
      </Badge>
      <Badge size={'lg'} color="success">
        Badge lg
      </Badge>
  </div>`;

  const exampleHexColor = `<div>
    <Badge hexColor="#622B14">#622B14</Badge>
    <Badge hexColor="#978F66">#978F66</Badge>
    <Badge hexColor="#35858E">#35858E</Badge>
    <Badge hexColor="#406AAF">#406AAF</Badge>
    <Badge hexColor="#934761">#934761</Badge>
    <Badge hexColor="#FFD65A">#FFD65A</Badge>
    <Badge hexColor="#5B7E3C">#5B7E3C</Badge>
    <Badge hexColor="#121358">#121358</Badge>
    <Badge hexColor="#744577">#744577</Badge>
  </div>`;

  const exampleDot = `<div>
    <Badge variant={'dot'} color="primary">
      Primary
    </Badge>
    <Badge variant={'dot'} color="secondary"></Badge>
      Secondary
    </Badge>
  </div>`;

  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Badge"
        description="Element kecil yang digunakan untuk menunjukan status, label, atau nilai pendukung pada sebuah komponen"
      />

      <div className="flex flex-1 flex-col gap-4">
        <MainSection title="Badge" code={example} contentClassName="flex gap-4">
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="danger">Danger</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="info">Info</Badge>
          <Badge color="orange">Orange</Badge>
          <Badge color="purple">Purple</Badge>
          <Badge color="gray">Gray</Badge>
        </MainSection>

        <MainSection
          title="Badge dot"
          code={exampleDot}
          contentClassName="flex gap-4"
        >
          <Badge variant={'dot'} color="primary">
            Primary
          </Badge>
          <Badge variant={'dot'} color="secondary">
            Secondary
          </Badge>
          <Badge variant={'dot'} color="success">
            Success
          </Badge>
          <Badge variant={'dot'} color="danger">
            Danger
          </Badge>
          <Badge variant={'dot'} color="warning">
            Warning
          </Badge>
          <Badge variant={'dot'} color="info">
            Info
          </Badge>
          <Badge variant={'dot'} color="orange">
            Orange
          </Badge>
          <Badge variant={'dot'} color="purple">
            Purple
          </Badge>
          <Badge variant={'dot'} color="gray">
            Gray
          </Badge>
        </MainSection>

        <MainSection
          title="Badge with Icon"
          code={exampleIcon}
          contentClassName="flex gap-4 items-center"
        >
          <Badge color="primary" className="flex items-center">
            <Icon name="clock" size={16} /> Primary
          </Badge>
          <Badge color="secondary" className="flex items-center">
            <Icon name="clock" size={16} /> Secondary
          </Badge>
          <Badge color="success" className="flex items-center">
            <Icon name="clock" size={16} /> Success
          </Badge>
          <Badge color="danger" className="flex items-center">
            <Icon name="clock" size={16} /> Danger
          </Badge>
          <Badge color="warning" className="flex items-center">
            <Icon name="clock" size={16} /> Warning
          </Badge>
          <Badge color="info" className="flex items-center">
            <Icon name="clock" size={16} /> Info
          </Badge>
          <Badge color="orange" className="flex items-center">
            <Icon name="clock" size={16} /> Orange
          </Badge>
          <Badge color="purple" className="flex items-center">
            <Icon name="clock" size={16} /> Purple
          </Badge>
          <Badge color="gray" className="flex items-center">
            <Icon name="clock" size={16} /> Gray
          </Badge>
        </MainSection>

        <MainSection
          title="Badge Size"
          code={exampleSize}
          contentClassName="flex gap-4 items-center"
        >
          <Badge size={'sm'} color="primary">
            Badge sm
          </Badge>
          <Badge size={'md'} color="danger">
            Badge md
          </Badge>
          <Badge size={'lg'} color="success">
            Badge lg
          </Badge>
        </MainSection>

        <MainSection
          title="Badge Custom Color"
          code={exampleHexColor}
          contentClassName="flex gap-4"
        >
          <Badge hexColor="#622B14">#622B14</Badge>
          <Badge hexColor="#978F66">#978F66</Badge>
          <Badge hexColor="#35858E">#35858E</Badge>
          <Badge hexColor="#406AAF">#406AAF</Badge>
          <Badge hexColor="#934761">#934761</Badge>
          <Badge hexColor="#FFD65A">#FFD65A</Badge>
          <Badge hexColor="#5B7E3C">#5B7E3C</Badge>
          <Badge hexColor="#121358">#121358</Badge>
          <Badge hexColor="#744577">#744577</Badge>
        </MainSection>

        <Card>
          <CardBody>
            <MarkdownRenderer content={doc?.content ?? ''} />
          </CardBody>
        </Card>

        <Footer
          title="Chip"
          backTo="/card"
          backToTitle="Card"
          nextTo="/avatar"
          nextToTitle="Avatar"
        />
      </div>
    </DashboardLayout>
  );
}
