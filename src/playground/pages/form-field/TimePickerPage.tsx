import { useState } from 'react';
import dedent from 'dedent';
import illust from '../../../assets/images/forms.png';
import { TimePicker } from '../../../components/time-picker';
import { Card, CardBody } from '../../../components/card';
import { Text } from '../../../components/text';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import Footer from '../../components/Footer';
import { useMarkdown } from '../../hooks/useMarkdown';

export default function TimePickerPage() {
  const { doc } = useMarkdown(`/docs/time-picker.md`);
  const [value, setValue] = useState<string>('');

  const defaultExample = dedent(`
    <TimePicker label="Jam Mulai" onChange={(val) => console.log(val)} />
  `);

  const columnsExample = dedent(`
    <div className="flex flex-col gap-4">
      <TimePicker label="Jam & Menit" />
      <TimePicker label="Dengan Detik" showSeconds />
      <TimePicker label="Hanya Jam" showMinutes={false} />
    </div>
  `);

  const hour12Example = dedent(`
    <TimePicker
      label="Jam Rapat"
      use12Hour
      showAmPm
      initialPosition="5:30"
    />
  `);

  const initialExample = dedent(`
    <div className="flex flex-col gap-4">
      <TimePicker label="defaultValue" defaultValue="08:15" />
      <TimePicker label="initialPosition" initialPosition="08:15" />
    </div>
  `);

  const labelExample = dedent(`
    <TimePicker
      label="Start time"
      placeholder="Select time"
      nowLabel="Now"
      confirmLabel="Apply"
    />
  `);

  const controlledExample = dedent(`
    const [value, setValue] = useState('');

    <TimePicker
      label="Jam Kedatangan"
      showSeconds
      onChange={setValue}
      hint={value !== '' ? \`Tersimpan: \${value}\` : 'Belum ada waktu dipilih.'}
    />
  `);

  const stateExample = dedent(`
    <div className="flex flex-col gap-4">
      <TimePicker label="Required" required />
      <TimePicker label="Hint" hint="Format 24 jam" />
      <TimePicker label="Tooltip" tooltip="Jam operasional kantor" />
      <TimePicker label="Error" errorMessages="Jam wajib diisi" />
      <TimePicker label="Disabled" disabled />
    </div>
  `);

  const sizeExample = dedent(`
    <div className="flex flex-col gap-4">
      <TimePicker label="Small (sm)" size="sm" />
      <TimePicker label="Medium (md)" size="md" />
      <TimePicker label="Large (lg)" size="lg" />
    </div>
  `);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Time Picker"
        description="Pemilih waktu dengan roller jam, menit, detik, dan AM/PM. Perubahan bersifat draft sampai tombol konfirmasi ditekan."
      />

      <div className="flex flex-col gap-8">
        <GridWrapper>
          <MainSection
            title="Time Picker"
            code={defaultExample}
            className="col-span-2"
          >
            <TimePicker label="Jam Mulai" />
          </MainSection>

          <MainSection title="Kolom yang Ditampilkan" code={columnsExample}>
            <div className="flex flex-col gap-4">
              <TimePicker label="Jam & Menit" />
              <TimePicker label="Dengan Detik" showSeconds />
              <TimePicker label="Hanya Jam" showMinutes={false} />
            </div>
          </MainSection>

          <MainSection title="Format 12 Jam" code={hour12Example}>
            <TimePicker
              label="Jam Rapat"
              use12Hour
              showAmPm
              initialPosition="5:30"
            />
          </MainSection>

          <MainSection
            title="defaultValue vs initialPosition"
            code={initialExample}
          >
            <div className="flex flex-col gap-4">
              <TimePicker label="defaultValue" defaultValue="08:15" />
              <TimePicker label="initialPosition" initialPosition="08:15" />
            </div>
          </MainSection>

          <MainSection title="Label Tombol (Dua Bahasa)" code={labelExample}>
            <TimePicker
              label="Start time"
              placeholder="Select time"
              nowLabel="Now"
              confirmLabel="Apply"
            />
          </MainSection>

          <MainSection
            title="Membaca Nilai"
            code={controlledExample}
            className="col-span-2"
          >
            <div className="flex flex-col gap-2">
              <TimePicker
                label="Jam Kedatangan"
                showSeconds
                onChange={setValue}
              />
              <Text
                variant="t3"
                className="text-gray-600"
                value={
                  value !== ''
                    ? `Tersimpan: ${value}`
                    : 'Belum ada waktu dipilih.'
                }
              />
            </div>
          </MainSection>

          <MainSection title="State Field" code={stateExample}>
            <div className="flex flex-col gap-4">
              <TimePicker label="Required" required />
              <TimePicker label="Hint" hint="Format 24 jam" />
              <TimePicker label="Tooltip" tooltip="Jam operasional kantor" />
              <TimePicker label="Error" errorMessages="Jam wajib diisi" />
              <TimePicker label="Disabled" disabled />
            </div>
          </MainSection>

          <MainSection title="Ukuran" code={sizeExample}>
            <div className="flex flex-col gap-4">
              <TimePicker label="Small (sm)" size="sm" />
              <TimePicker label="Medium (md)" size="md" />
              <TimePicker label="Large (lg)" size="lg" />
            </div>
          </MainSection>
        </GridWrapper>

        <Card>
          <CardBody>
            <MarkdownRenderer content={doc?.content ?? ''} />
          </CardBody>
        </Card>

        <Footer
          backTo="/playground/day-of-month-picker"
          backToTitle="Day Of Month Picker"
          nextTo="/playground/input-otp"
          title="Time Picker"
          nextToTitle="Input OTP"
        />
      </div>
    </>
  );
}
