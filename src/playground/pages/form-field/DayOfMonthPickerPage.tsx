import dedent from 'dedent';
import GridWrapper from '../../components/GridWrapper';
import MainSection from '../../components/MainSection';
import { DayOfMonthPicker } from '../../../components/day-of-month-picker/day-of-month-picker';

const exampleDefault = dedent(`
  import { DayOfMonthPicker } from '@herca/r-kit/clients';

  return (
    <DayOfMonthPicker
      label="Day of Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleMultiple = dedent(`
  import { DayOfMonthPicker } from '@herca/r-kit/clients';

  return (
    <DayOfMonthPicker
      mode="multiple"
      label="Day of Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleRange = dedent(`
  import { DayOfMonthPicker } from '@herca/r-kit/clients';

  return (
    <DayOfMonthPicker
      mode="range"
      label="Day of Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleSize = dedent(`
  import { DayOfMonthPicker } from '@herca/r-kit/clients';

  return (
    <>
      <DayOfMonthPicker tooltip="title" label="Small" size="sm" />
      <DayOfMonthPicker tooltip="title" label="Medium" size="md" />
      <DayOfMonthPicker tooltip="title" label="Large" size="lg" />
    </>
  )
`);

const exampleRequired = dedent(`
  import { DayOfMonthPicker } from '@herca/r-kit/clients';

  return (
    <DayOfMonthPicker
      required
      label="Day of Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleHint = dedent(`
  import { DayOfMonthPicker } from '@herca/r-kit/clients';

  return (
    <DayOfMonthPicker
      hint="Select a day"
      label="Day of Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleTooltip = dedent(`
  import { DayOfMonthPicker } from '@herca/r-kit/clients';

  return (
    <DayOfMonthPicker
      tooltip="Additional information"
      label="Day of Month"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleError = dedent(`
  import { DayOfMonthPicker } from '@herca/r-kit/clients';

  return (
    <DayOfMonthPicker
      label="Day of Month"
      errorMessages="This field is required"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleDisabled = dedent(`
  import { DayOfMonthPicker } from '@herca/r-kit/clients';

  return (
    <DayOfMonthPicker
      disabled
      label="Day of Month"
    />
  )
`);

const exampleDefaultValue = dedent(`
  import { DayOfMonthPicker } from '@herca/r-kit/clients';

  return (
    <>
      <DayOfMonthPicker
        label="Single"
        defaultValue={[15]}
        onChange={(e) => console.log(e)}
      />
      <DayOfMonthPicker
        mode="range"
        label="Range"
        defaultValue={{ startDate: 1, endDate: 15 }}
        onChange={(e) => console.log(e)}
      />
      <DayOfMonthPicker
        mode="multiple"
        label="Multiple"
        defaultValue={[1, 8, 15, 22]}
        onChange={(e) => console.log(e)}
      />
    </>
  )
`);

const exampleCustomLabel = dedent(`
  import { DayOfMonthPicker } from '@herca/r-kit/clients';

  return (
    <DayOfMonthPicker
      label="Day of Month"
      cancelLabel="Cancel"
      confirmLabel="Apply"
      onChange={(e) => console.log(e)}
    />
  )
`);

export default function DayOfMonthPickerPage() {
  return (
    <>
      <GridWrapper>
        <MainSection title="Default" code={exampleDefault}>
          <DayOfMonthPicker
            label="Day of Month"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Multiple" code={exampleMultiple}>
          <DayOfMonthPicker
            mode="multiple"
            label="Day of Month"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Range" code={exampleRange}>
          <DayOfMonthPicker
            mode="range"
            label="Day of Month"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Size" code={exampleSize}>
          <DayOfMonthPicker tooltip="title" label="Small" size="sm" />
          <DayOfMonthPicker tooltip="title" label="Medium" size="md" />
          <DayOfMonthPicker tooltip="title" label="Large" size="lg" />
        </MainSection>

        <MainSection title="Required" code={exampleRequired}>
          <DayOfMonthPicker
            required
            label="Day of Month"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Hint" code={exampleHint}>
          <DayOfMonthPicker
            hint="Select a day"
            label="Day of Month"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Tooltip" code={exampleTooltip}>
          <DayOfMonthPicker
            tooltip="Additional information"
            label="Day of Month"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Error" code={exampleError}>
          <DayOfMonthPicker
            label="Day of Month"
            errorMessages="This field is required"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Disabled" code={exampleDisabled}>
          <DayOfMonthPicker disabled label="Day of Month" />
        </MainSection>

        <MainSection title="Default Value" code={exampleDefaultValue}>
          <DayOfMonthPicker
            label="Single"
            defaultValue={[15]}
            onChange={(e) => console.log(e)}
          />
          <DayOfMonthPicker
            mode="range"
            label="Range"
            defaultValue={{ startDate: 1, endDate: 15 }}
            onChange={(e) => console.log(e)}
          />
          <DayOfMonthPicker
            mode="multiple"
            label="Multiple"
            defaultValue={[1, 8, 15, 22]}
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Custom Label" code={exampleCustomLabel}>
          <DayOfMonthPicker
            label="Day of Month"
            cancelLabel="Cancel"
            confirmLabel="Apply"
            onChange={(e) => console.log(e)}
          />
        </MainSection>
      </GridWrapper>
    </>
  );
}
