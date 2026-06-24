import { YearPicker } from '../../../clients';
import { TimePicker } from '../../../components/time-picker/time-picker';
import GridWrapper from '../../components/GridWrapper';
import MainSection from '../../components/MainSection';

export default function YearPickerPage() {
  return (
    <>
      <GridWrapper>
        <MainSection title="default">
          <YearPicker onChange={(e) => console.log(e)} />
        </MainSection>
        <MainSection title="default">
          <YearPicker
            mode="range"
            label="Time"
            onChange={(e) => console.log(e)}
          />
        </MainSection>
        <MainSection title="default">
          <YearPicker mode="multiple" label="Time" />
        </MainSection>
        <MainSection title="required">
          <TimePicker required label="Time" />
        </MainSection>
        <MainSection title="required">
          <TimePicker hint="Hint" label="Time" />
        </MainSection>
        <MainSection title="required">
          <TimePicker tooltip="title" label="Small" size="sm" />
          <TimePicker tooltip="title" label="Medium" size="md" />
          <TimePicker tooltip="title" label="Large" size="lg" />
        </MainSection>
        <MainSection title="required">
          <TimePicker tooltip="title" label="Time" errorMessages="tes" />
        </MainSection>
      </GridWrapper>
    </>
  );
}
