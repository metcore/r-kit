import dedent from 'dedent';
import { MonthPicker } from '../../../components/month-picker';
import illust from '../../../assets/images/forms.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
import MainSection from '../../components/MainSection';

const exampleDefault = dedent(`
  import { MonthPicker } from '@herca/r-kit/clients';

  return (
    <MonthPicker
      label="Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleMultiple = dedent(`
  import { MonthPicker } from '@herca/r-kit/clients';

  return (
    <MonthPicker
      mode="multiple"
      label="Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleRange = dedent(`
  import { MonthPicker } from '@herca/r-kit/clients';

  return (
    <MonthPicker
      mode="range"
      label="Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleSize = dedent(`
  import { MonthPicker } from '@herca/r-kit/clients';

  return (
    <>
      <MonthPicker tooltip="title" label="Small" size="sm" />
      <MonthPicker tooltip="title" label="Medium" size="md" />
      <MonthPicker tooltip="title" label="Large" size="lg" />
    </>
  )
`);

const exampleRequired = dedent(`
  import { MonthPicker } from '@herca/r-kit/clients';

  return (
    <MonthPicker
      required
      label="Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleHint = dedent(`
  import { MonthPicker } from '@herca/r-kit/clients';

  return (
    <MonthPicker
      hint="Select a month"
      label="Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleTooltip = dedent(`
  import { MonthPicker } from '@herca/r-kit/clients';

  return (
    <MonthPicker
      tooltip="Additional information"
      label="Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleError = dedent(`
  import { MonthPicker } from '@herca/r-kit/clients';

  return (
    <MonthPicker
      label="Month"
      errorMessages="This field is required"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleDisabled = dedent(`
  import { MonthPicker } from '@herca/r-kit/clients';

  return (
    <MonthPicker
      disabled
      label="Month"
    />
  )
`);

const exampleDefaultValue = dedent(`
  import { MonthPicker } from '@herca/r-kit/clients';

  return (
    <>
      <MonthPicker
        label="Single"
        defaultValue={[3]}
        onChange={(e) => console.log(e)}
      />
      <MonthPicker
        mode="range"
        label="Range"
        defaultValue={{ startDate: 2, endDate: 6 }}
        onChange={(e) => console.log(e)}
      />
      <MonthPicker
        mode="multiple"
        label="Multiple"
        defaultValue={[1, 4, 7, 10]}
        onChange={(e) => console.log(e)}
      />
    </>
  )
`);

const exampleCustomLabel = dedent(`
  import { MonthPicker } from '@herca/r-kit/clients';

  return (
    <MonthPicker
      label="Month"
      cancelLabel="Cancel"
      confirmLabel="Apply"
      onChange={(e) => console.log(e)}
    />
  )
`);

export default function MonthPickerPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Month Picker"
        description="Memilih bulan beserta tahunnya tanpa harus menelusuri kalender harian."
      />

      <GridWrapper>
        <MainSection title="Default" code={exampleDefault}>
          <MonthPicker label="Month" onChange={(e) => console.log(e)} />
        </MainSection>

        <MainSection title="Multiple" code={exampleMultiple}>
          <MonthPicker
            mode="multiple"
            label="Month"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Range" code={exampleRange}>
          <MonthPicker
            mode="range"
            label="Month"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Size" code={exampleSize}>
          <MonthPicker tooltip="title" label="Small" size="sm" />
          <MonthPicker tooltip="title" label="Medium" size="md" />
          <MonthPicker tooltip="title" label="Large" size="lg" />
        </MainSection>

        <MainSection title="Required" code={exampleRequired}>
          <MonthPicker
            required
            label="Month"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Hint" code={exampleHint}>
          <MonthPicker
            hint="Select a month"
            label="Month"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Tooltip" code={exampleTooltip}>
          <MonthPicker
            tooltip="Additional information"
            label="Month"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Error" code={exampleError}>
          <MonthPicker
            label="Month"
            errorMessages="This field is required"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Disabled" code={exampleDisabled}>
          <MonthPicker disabled label="Month" />
        </MainSection>

        <MainSection title="Default Value" code={exampleDefaultValue}>
          <MonthPicker
            label="Single"
            defaultValue={[3]}
            onChange={(e) => console.log(e)}
          />
          <MonthPicker
            mode="range"
            label="Range"
            defaultValue={{ startDate: 2, endDate: 6 }}
            onChange={(e) => console.log(e)}
          />
          <MonthPicker
            mode="multiple"
            label="Multiple"
            defaultValue={[1, 4, 7, 10]}
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Custom Label" code={exampleCustomLabel}>
          <MonthPicker
            label="Month"
            cancelLabel="Cancel"
            confirmLabel="Apply"
            onChange={(e) => console.log(e)}
          />
        </MainSection>
      </GridWrapper>

      <Footer
        title="Month Picker"
        backTo="/playground/text-area"
        backToTitle="Text Area"
        nextTo="/playground/year-picker"
        nextToTitle="Year Picker"
      />
    </>
  );
}
