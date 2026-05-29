import dedent from 'dedent';
import { useState } from 'react';
import { Button } from '../../../components/button';
import { Card, CardBody } from '../../../components/card';
import { DatePicker, type DateRange } from '../../../components/date-picker';
import { Icon } from '../../../components/icons';
import illust from '../../assets/images/forms.png';
import Footer from '../../components/Footer';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { useMarkdown } from '../../hooks/useMarkdown';

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
};

export default function DatePickerPage() {
  const { doc } = useMarkdown(`/docs/date-picker.md`);
  const [singleValue, setSingleValue] = useState<Date | null>(new Date());
  const [singleMonthNameValue, setSingleMonthNameValue] = useState<Date | null>(
    null
  );
  const [rangeValue, setRangeValue] = useState<DateRange>({
    start: addDays(new Date(), -6),
    end: new Date(),
  });
  const [open, setOpen] = useState(false);

  const minDate = new Date();
  const maxDate = addDays(new Date(), 7);

  const defaultExample = dedent(`
      <DatePicker
        format="DD-MM-YYYY"
        value={singleValue}
        onChange={setSingleValue}
      />
    `);

  const customeFormatExample = dedent(`
      <DatePicker
        format="DD MMM YYYY"
        value={singleMonthNameValue}
        onChange={setSingleMonthNameValue}
      />
    `);

  const rangeExample = dedent(`
      <DatePicker
        format="DD-MM-YYYY"
        mode="range"
        value={rangeValue}
        onChange={setRangeValue}
      />
    `);

  const customeTriggerExample = dedent(`
      <DatePicker
        align="end"
        format="DD MMMM YYYY"
        trigger={
          <Button variant="outline" color="gray" className="w-full">
            <Icon name="calendar" />
            Pick a deadline
          </Button>
        }
      />
    `);

  const minMaxExample = dedent(`
      <DatePicker
        format="DD-MM-YYYY"
        minDate={minDate}
        maxDate={maxDate}
        disabledDateClassName="text-gray-400"
      />
    `);

  const controlledOpenStateExample = dedent(`
      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          color="gray"
          className="w-fit"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? 'Close Calendar' : 'Open Calendar'}
        </Button>
        <DatePicker
          open={open}
          onOpenChange={setOpen}
          format="MM/DD/YYYY"
        />
      </div>`);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Date Picker"
        description="Digunakan untuk memilih tanggal secara akurat menggunakan tampilan kalender yang interaktif."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection title="Single Date (Default)" code={defaultExample}>
            <div className="flex flex-col gap-3">
              <DatePicker
                autoWidth
                isClearable
                format="DD-MM-YYYY"
                value={singleValue}
                onChange={setSingleValue}
              />
              <p className="text-xs text-gray-500">
                Selected:{' '}
                {singleValue ? singleValue.toLocaleDateString('id-ID') : '-'}
              </p>
            </div>
          </MainSection>

          <MainSection
            title="Single Date (Custom Format)"
            code={customeFormatExample}
          >
            <div className="flex flex-col gap-3">
              <DatePicker
                placeholder="Work Estimate"
                format="DD MMM YYYY"
                value={singleMonthNameValue}
                onChange={setSingleMonthNameValue}
              />
              <p className="text-xs text-gray-500">
                Selected:{' '}
                {singleMonthNameValue
                  ? singleMonthNameValue.toLocaleDateString('id-ID')
                  : '-'}
              </p>
            </div>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection title="Range Date" code={rangeExample}>
            <div className="flex flex-col gap-3">
              <DatePicker
                isClearable
                mode="range"
                format="DD MMM YYYY"
                rangeValue={rangeValue}
                onRangeChange={setRangeValue}
              />
              <p className="text-xs text-gray-500">
                Range: {rangeValue.start?.toLocaleDateString('id-ID') ?? '-'} -{' '}
                {rangeValue.end?.toLocaleDateString('id-ID') ?? '-'}
              </p>
            </div>
          </MainSection>

          <MainSection title="Custom Trigger" code={customeTriggerExample}>
            <DatePicker
              align="end"
              format="DD MMMM YYYY"
              trigger={
                <Button variant="outline" color="gray" className="w-full">
                  <Icon name="calendar" />
                  Pick a deadline
                </Button>
              }
            />
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection title="With Min & Max Date" code={minMaxExample}>
            <DatePicker
              format="DD/MM/YYYY"
              minDate={minDate}
              maxDate={maxDate}
              disabledDateClassName="text-gray-400"
            />
          </MainSection>

          <MainSection
            title="Controlled Open State"
            code={controlledOpenStateExample}
          >
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                color="gray"
                className="w-fit"
                onClick={() => setOpen((prev) => !prev)}
              >
                {open ? 'Close Calendar' : 'Open Calendar'}
              </Button>
              <DatePicker
                open={open}
                onOpenChange={setOpen}
                format="MM/DD/YYYY"
              />
            </div>
          </MainSection>
        </GridWrapper>

        <Card>
          <CardBody>
            <MarkdownRenderer content={doc?.content ?? ''} />
          </CardBody>
        </Card>

        <Footer
          backTo="/input-file"
          backToTitle="Input File"
          title="Date Picker"
          nextTo="/radio-button"
          nextToTitle="Radio Button"
        />
      </div>
    </>
  );
}
