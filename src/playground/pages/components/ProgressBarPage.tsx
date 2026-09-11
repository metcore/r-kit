import { useEffect, useState } from 'react';
import dedent from 'dedent';
import illust from '../../../assets/images/forms.png';
import ProgressBar from '../../../components/progress-bar/progress-bar';
import { Button } from '../../../components/button';
import { Text } from '../../../components/text';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';

const COLORS = [
  { color: 'primary', value: 10 },
  { color: 'info', value: 20 },
  { color: 'danger', value: 30 },
  { color: 'warning', value: 40 },
  { color: 'orange', value: 50 },
  { color: 'purple', value: 60 },
  { color: 'gray', value: 70 },
] as const;

const exampleBasic = dedent(`
  import { ProgressBar } from '@herca/r-kit';

  <ProgressBar value={40} />
`);

const exampleColors = dedent(`
  // value diisi 0-100. Warna mengikuti palet BaseColor.
  <div className="space-y-3">
    <ProgressBar value={10} />
    <ProgressBar value={20} color="info" />
    <ProgressBar value={30} color="danger" />
    <ProgressBar value={40} color="warning" />
    <ProgressBar value={50} color="orange" />
    <ProgressBar value={60} color="purple" />
    <ProgressBar value={70} color="gray" />
  </div>
`);

const exampleTooltipTop = dedent(`
  // useTooltip memunculkan nilai persentase saat bar disentuh.
  // Tanpa tooltipSide, tooltip muncul di atas.
  <ProgressBar useTooltip value={40} />
`);

const exampleTooltipBottom = dedent(`
  <ProgressBar useTooltip tooltipSide="bottom" value={40} />
`);

const exampleLive = dedent(`
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setValue((v) => (v >= 100 ? 0 : v + 5)),
      600
    );
    return () => clearInterval(id);
  }, []);

  <ProgressBar useTooltip value={value} color="success" />
`);

export default function ProgressBarPage() {
  const [value, setValue] = useState(35);
  const [live, setLive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setLive((v) => (v >= 100 ? 0 : v + 5)), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <HeroSection
        title="Components"
        description="Menampilkan kemajuan sebuah proses, baik yang panjangnya diketahui maupun yang masih berjalan tanpa batas waktu pasti."
        subtitle="Progress Bar"
        illust={illust}
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection
            title="Basic"
            code={exampleBasic}
            contentClassName="space-y-4"
          >
            <ProgressBar value={value} />
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                color="gray"
                onClick={() => setValue((v) => Math.max(v - 10, 0))}
              >
                −10
              </Button>
              <Button
                size="sm"
                variant="outline"
                color="gray"
                onClick={() => setValue((v) => Math.min(v + 10, 100))}
              >
                +10
              </Button>
              <Text
                variant="t1"
                className="text-gray-800"
                value={`${value}%`}
              />
            </div>
          </MainSection>

          <MainSection
            title="Berjalan Otomatis"
            code={exampleLive}
            contentClassName="space-y-3"
          >
            <ProgressBar useTooltip value={live} color="success" />
            <Text variant="t1" className="text-gray-800" value={`${live}%`} />
          </MainSection>
        </GridWrapper>

        <MainSection
          title="Warna"
          code={exampleColors}
          contentClassName="space-y-3"
        >
          {COLORS.map((item) => (
            <ProgressBar
              key={item.color}
              value={item.value}
              color={item.color}
            />
          ))}
        </MainSection>

        <GridWrapper>
          <MainSection
            title="Tooltip di Atas"
            code={exampleTooltipTop}
            contentClassName="space-y-3"
          >
            {COLORS.map((item) => (
              <ProgressBar
                useTooltip
                key={item.color}
                value={item.value}
                color={item.color}
              />
            ))}
          </MainSection>

          <MainSection
            title="Tooltip di Bawah"
            code={exampleTooltipBottom}
            contentClassName="space-y-3"
          >
            {COLORS.map((item) => (
              <ProgressBar
                useTooltip
                tooltipSide="bottom"
                key={item.color}
                value={item.value}
                color={item.color}
              />
            ))}
          </MainSection>
        </GridWrapper>

        <Footer
          title="Progress Bar"
          backTo="/playground/modal"
          backToTitle="Modal"
          nextTo="/playground/image"
          nextToTitle="Image"
        />
      </div>
    </>
  );
}
