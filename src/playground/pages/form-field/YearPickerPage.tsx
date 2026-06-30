import dedent from 'dedent';
import { YearPicker } from '../../../components/year-picker';
import GridWrapper from '../../components/GridWrapper';
import MainSection from '../../components/MainSection';

const exampleDefault = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <YearPicker
      label="Year"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleMultiple = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <YearPicker
      mode="multiple"
      label="Year"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleRange = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <YearPicker
      mode="range"
      label="Year"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleMinMax = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <>
      <YearPicker
        label="Min Year"
        minYear={2020}
        onChange={(e) => console.log(e)}
      />
      <YearPicker
        label="Max Year"
        maxYear={2026}
        onChange={(e) => console.log(e)}
      />
      <YearPicker
        label="Min & Max Year"
        minYear={2020}
        maxYear={2026}
        onChange={(e) => console.log(e)}
      />
    </>
  )
`);

const exampleSize = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <>
      <YearPicker tooltip="title" label="Small" size="sm" />
      <YearPicker tooltip="title" label="Medium" size="md" />
      <YearPicker tooltip="title" label="Large" size="lg" />
    </>
  )
`);

const exampleRequired = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <YearPicker
      required
      label="Year"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleHint = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <YearPicker
      hint="Select a year"
      label="Year"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleTooltip = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <YearPicker
      tooltip="Additional information"
      label="Year"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleError = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <YearPicker
      label="Year"
      errorMessages="This field is required"
      onChange={(e) => console.log(e)}
    />
  )
`);

const exampleDisabled = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <YearPicker
      disabled
      label="Year"
    />
  )
`);

const exampleDefaultValue = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <>
      <YearPicker
        label="Single"
        defaultValue={[2024]}
        onChange={(e) => console.log(e)}
      />
      <YearPicker
        mode="range"
        label="Range"
        defaultValue={{ startDate: 2020, endDate: 2024 }}
        onChange={(e) => console.log(e)}
      />
      <YearPicker
        mode="multiple"
        label="Multiple"
        defaultValue={[2022, 2023, 2024]}
        onChange={(e) => console.log(e)}
      />
    </>
  )
`);

const exampleCustomLabel = dedent(`
  import { YearPicker } from '@herca/r-kit/clients';

  return (
    <YearPicker
      label="Year"
      confirmLabel="Apply"
      onChange={(e) => console.log(e)}
    />
  )
`);

export default function YearPickerPage() {
  return (
    <>
      <GridWrapper>
        <MainSection title="Default" code={exampleDefault}>
          <YearPicker label="Year" onChange={(e) => console.log(e)} />
        </MainSection>

        <MainSection title="Multiple" code={exampleMultiple}>
          <YearPicker
            mode="multiple"
            label="Year"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Range" code={exampleRange}>
          <YearPicker
            mode="range"
            label="Year"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Min Max Year" code={exampleMinMax}>
          <YearPicker
            label="Min Year"
            minYear={2020}
            onChange={(e) => console.log(e)}
          />
          <YearPicker
            label="Max Year"
            maxYear={2026}
            onChange={(e) => console.log(e)}
          />
          <YearPicker
            label="Min & Max Year"
            minYear={2020}
            maxYear={2026}
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Size" code={exampleSize}>
          <YearPicker tooltip="title" label="Small" size="sm" />
          <YearPicker tooltip="title" label="Medium" size="md" />
          <YearPicker tooltip="title" label="Large" size="lg" />
        </MainSection>

        <MainSection title="Required" code={exampleRequired}>
          <YearPicker required label="Year" onChange={(e) => console.log(e)} />
        </MainSection>

        <MainSection title="Hint" code={exampleHint}>
          <YearPicker
            hint="Select a year"
            label="Year"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Tooltip" code={exampleTooltip}>
          <YearPicker
            tooltip="Additional information"
            label="Year"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Error" code={exampleError}>
          <YearPicker
            label="Year"
            errorMessages="This field is required"
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Disabled" code={exampleDisabled}>
          <YearPicker disabled label="Year" />
        </MainSection>

        <MainSection title="Default Value" code={exampleDefaultValue}>
          <YearPicker
            label="Single"
            defaultValue={[2024]}
            onChange={(e) => console.log(e)}
          />
          <YearPicker
            mode="range"
            label="Range"
            defaultValue={{ startDate: 2020, endDate: 2024 }}
            onChange={(e) => console.log(e)}
          />
          <YearPicker
            mode="multiple"
            label="Multiple"
            defaultValue={[2022, 2023, 2024]}
            onChange={(e) => console.log(e)}
          />
        </MainSection>

        <MainSection title="Custom Label" code={exampleCustomLabel}>
          <YearPicker
            label="Year"
            confirmLabel="Apply"
            onChange={(e) => console.log(e)}
          />
        </MainSection>
      </GridWrapper>
    </>
  );
}
