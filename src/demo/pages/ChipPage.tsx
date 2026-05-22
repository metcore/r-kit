import { useEffect, useState } from 'react';
import { Card, CardBody } from '../../components/card';
import {
  Chip,
  ChipGroup,
  type ChipOptionProps,
  type ChipValue,
} from '../../components/chip';
import { Icon } from '../../components/icons';
import illust from '../assets/images/navigation.png';
import Footer from '../components/Footer';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useMarkdown } from '../hooks/useMarkdown';
import DashboardLayout from '../layouts/DashboardLayout';

const chipOptions: ChipOptionProps[] = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'next-js', label: 'Next.js' },
  { value: 'node-js', label: 'Node.js', disabled: true },
];

const chipOptions2: ChipOptionProps[] = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'next-js', label: 'Next.js' },
  { value: 'node-js', label: 'Node.js', disabled: true },
];
const chipOptionsWithIcon: ChipOptionProps[] = [
  {
    value: 'frontend',
    label: 'Frontend',
    icon: <Icon name="layout-web-left" size={14} />,
  },
  {
    value: 'backend',
    label: 'Backend',
    icon: <Icon name="server" size={14} />,
  },
  {
    value: 'design',
    label: 'Design',
    icon: <Icon name="settings-slider" size={14} />,
  },
];

const colors = [
  'primary',
  'success',
  'danger',
  'orange',
  'info',
  'purple',
  'gray',
  'warning',
] as const;

const exampleMultiple = `const [selected, setSelected] = useState<ChipValue[]>([]);

<ChipGroup
  options={chipOptions}
  selected={selected}
  onSelect={setSelected}
  multiple
  color="success"
/>`;

const exampleSingle = `const [selected, setSelected] = useState<ChipValue[]>([]);

<ChipGroup
  options={chipOptions}
  selected={selected}
  onSelect={setSelected}
  color="primary"
/>`;

const exampleColor = `<div className="flex flex-wrap gap-2">
  <Chip color="primary">Primary</Chip>
  <Chip color="success">Success</Chip>
  <Chip color="danger">Danger</Chip>
  <Chip color="warning">Warning</Chip>
</div>`;

const exampleSize = `<div className="flex flex-wrap items-center gap-2">
  <Chip size="sm">Small</Chip>
  <Chip size="md">Medium</Chip>
  <Chip size="lg">Large</Chip>
</div>`;

const exampleDismissible = `<ChipGroup
  options={chipOptions}
  dismissible
  onDismiss={(value) => {
    // handle dismissed value
  }}
/>`;

const exampleReorderable = `<ChipGroup
  options={chipOptions}
  reorderable
  onReorder={(options) => {
    // handle new options order
  }}
/>`;

export default function ChipPage() {
  const { doc } = useMarkdown('/docs/chip.md');
  const [selected, setSelected] = useState<ChipValue[]>([]);
  const [singleSelected, setSingleSelected] = useState<ChipValue[]>([]);
  const [dismissedValue, setDismissedValue] = useState<ChipValue | null>(null);
  const [reorderedOptions, setReorderedOptions] =
    useState<ChipOptionProps[]>(chipOptions);

  useEffect(() => {
    console.log(dismissedValue);
  }, [dismissedValue]);

  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Chip"
        description="Chip digunakan untuk menampilkan pilihan ringkas, filter, tag, atau aksi kecil dalam sebuah interface."
      />

      <div className="flex flex-1 flex-col gap-4">
        <GridWrapper>
          <MainSection
            title="Chip Group Multiple Select"
            code={exampleMultiple}
            className="flex-1"
            contentClassName="flex flex-col gap-4"
          >
            <ChipGroup
              options={chipOptions}
              selected={selected}
              onSelect={setSelected}
              multiple
              color="success"
              size="md"
            />
            <p className="text-sm text-gray-700">
              Selected: {selected.length > 0 ? selected.join(', ') : '-'}
            </p>
          </MainSection>

          <MainSection
            title="Chip Group Single Select"
            code={exampleSingle}
            className="flex-1"
            contentClassName="flex flex-col gap-4"
          >
            <ChipGroup
              options={chipOptions}
              selected={singleSelected}
              onSelect={setSingleSelected}
              direction="vertical"
              color="primary"
              size="md"
            />
            <p className="text-sm text-gray-700">
              Selected:{' '}
              {singleSelected.length > 0 ? singleSelected.join(', ') : '-'}
            </p>
          </MainSection>
        </GridWrapper>

        <MainSection title="Chip Color" code={exampleColor}>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Chip key={color} color={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Chip>
            ))}
          </div>
        </MainSection>

        <GridWrapper>
          <MainSection title="Chip Size" code={exampleSize} className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Chip size="sm">Small</Chip>
              <Chip size="md">Medium</Chip>
              <Chip size="lg">Large</Chip>
            </div>
          </MainSection>

          <MainSection title="Chip with Icon" code={null} className="flex-1">
            <ChipGroup options={chipOptionsWithIcon} color="info" />
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection
            title="Chip Dismissible"
            code={exampleDismissible}
            className="flex-1"
            contentClassName="flex flex-col gap-4"
          >
            <ChipGroup
              options={chipOptions2}
              dismissible
              reorderable
              onDismiss={(value) => setDismissedValue(value)}
            />
            <p className="text-sm text-gray-700">
              Dismissed:{' '}
              {dismissedValue !== null ? String(dismissedValue) : '-'}
            </p>
          </MainSection>

          <MainSection
            title="Chip Reorderable"
            code={exampleReorderable}
            className="flex-1"
            contentClassName="flex flex-col gap-4"
          >
            <ChipGroup
              options={reorderedOptions}
              reorderable
              onReorder={setReorderedOptions}
            />
            <p className="text-sm text-gray-700">
              Order: {reorderedOptions.map((option) => option.label).join(', ')}
            </p>
          </MainSection>
        </GridWrapper>

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
