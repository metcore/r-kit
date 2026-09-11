import dedent from 'dedent';
import illust from '../../../assets/images/forms.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
import MainSection from '../../components/MainSection';
import { DayPicker } from '../../../components/day-picker/day-picker';

const exampleDefault = dedent(`
  import { DayPicker } from '@herca/r-kit/clients';

  return (
    <DayPicker
      label="Day"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleMultiple = dedent(`
  import { DayPicker } from '@herca/r-kit/clients';

  return (
    <DayPicker
      mode="multiple"
      label="Day"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleRange = dedent(`
  import { DayPicker } from '@herca/r-kit/clients';

  return (
    <DayPicker
      mode="range"
      label="Day"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleSize = dedent(`
  import { DayPicker } from '@herca/r-kit/clients';

  return (
    <>
      <DayPicker tooltip="title" label="Small" size="sm" />
      <DayPicker tooltip="title" label="Medium" size="md" />
      <DayPicker tooltip="title" label="Large" size="lg" />
    </>
  )
`);

const exampleRequired = dedent(`
  import { DayPicker } from '@herca/r-kit/clients';

  return (
    <DayPicker
      required
      label="Day"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleHint = dedent(`
  import { DayPicker } from '@herca/r-kit/clients';

  return (
    <DayPicker
      hint="Select a day"
      label="Day"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleTooltip = dedent(`
  import { DayPicker } from '@herca/r-kit/clients';

  return (
    <DayPicker
      tooltip="Additional information"
      label="Day"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleError = dedent(`
  import { DayPicker } from '@herca/r-kit/clients';

  return (
    <DayPicker
      label="Day"
      errorMessages="This field is required"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleDisabled = dedent(`
  import { DayPicker } from '@herca/r-kit/clients';

  return (
    <DayPicker
      disabled
      label="Day"
    />
  )
`);

const exampleDefaultValue = dedent(`
  import { DayPicker } from '@herca/r-kit/clients';

  return (
    <>
      <DayPicker
        label="Single"
        defaultValue={[1]}
        onChange={(e) => console.log(e)}
      />
      <DayPicker
        mode="range"
        label="Range"
        defaultValue={{ startDate: 1, endDate: 5 }}
        onChange={(e) => console.log(e)}
      />
      <DayPicker
        mode="multiple"
        label="Multiple"
        defaultValue={[1, 3, 5]}
        onChange={(e) => console.log(e)}
      />
    </>
  )
`);

const exampleCustomLabel = dedent(`
  import { DayPicker } from '@herca/r-kit/clients';

  return (
    <DayPicker
      label="Day"
      cancelLabel="Cancel"
      confirmLabel="Apply"
      onChange={(e) => console.log(e)}
    />
  )
`);

export default function DayPickerPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Day Picker"
        description="Memilih satu atau beberapa hari dalam seminggu, misalnya untuk mengatur jadwal berulang."
      />

      <GridWrapper>
        <MainSection title="Default" code={exampleDefault}>
          <DayPicker label="Day" onChange={(e) => console.log(e)} />
        </MainSection>

        <MainSection title="Multiple" code={exampleMultiple}>
          <DayPicker
            mode="multiple"
            label="Day"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Range" code={exampleRange}>
          <DayPicker
            mode="range"
            label="Day"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Size" code={exampleSize}>
          <DayPicker tooltip="title" label="Small" size="sm" />
          <DayPicker tooltip="title" label="Medium" size="md" />
          <DayPicker tooltip="title" label="Large" size="lg" />
        </MainSection>

        <MainSection title="Required" code={exampleRequired}>
          <DayPicker required label="Day" onChange={(e) => console.log(e)} />
        </MainSection>

        <MainSection title="Hint" code={exampleHint}>
          <DayPicker
            hint="Select a day"
            label="Day"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Tooltip" code={exampleTooltip}>
          <DayPicker
            tooltip="Additional information"
            label="Day"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Error" code={exampleError}>
          <DayPicker
            label="Day"
            errorMessages="This field is required"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Disabled" code={exampleDisabled}>
          <DayPicker disabled label="Day" />
        </MainSection>

        <MainSection title="Default Value" code={exampleDefaultValue}>
          <DayPicker
            label="Single"
            defaultValue={[1]}
            onChange={(e) => console.log(e)}
          />
          <DayPicker
            mode="range"
            label="Range"
            defaultValue={{ startDate: 1, endDate: 5 }}
            onChange={(e) => console.log(e)}
          />
          <DayPicker
            mode="multiple"
            label="Multiple"
            defaultValue={[1, 3, 5]}
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Custom Label" code={exampleCustomLabel}>
          <DayPicker
            label="Day"
            cancelLabel="Cancel"
            confirmLabel="Apply"
            onChange={(e) => console.log(e)}
          />
        </MainSection>
      </GridWrapper>

      <Footer
        title="Day Picker"
        backTo="/playground/year-picker"
        backToTitle="Year Picker"
        nextTo="/playground/day-of-month-picker"
        nextToTitle="Day Of Month Picker"
      />
    </>
  );
}
