import { MonthPicker } from '../../../components/month-picker';
import { TimePicker } from '../../../components/time-picker/time-picker';
import GridWrapper from '../../components/GridWrapper';
import MainSection from '../../components/MainSection';

export default function MonthPickerPage() {
  return (
    <>
      <GridWrapper>
        <MainSection title="default">
          <MonthPicker onChange={(e) => console.log(e)} />
        </MainSection>
        <MainSection title="default">
          <MonthPicker
            mode="range"
            label="Time"
            onChange={(e) => console.log(e)}
          />
        </MainSection>
        <MainSection title="default">
          <MonthPicker mode="multiple" label="Time" />
        </MainSection>
        <MainSection title="required">
          <TimePicker required label="Time" />
        </MainSection>
        <MainSection title="required">
          <TimePicker hint="Hint" label="Time" />
        </MainSection>
        <MainSection title="required">
          <TimePicker tooltip="title" label="Time" />
        </MainSection>
        <MainSection title="required">
          <TimePicker tooltip="title" label="Time" errorMessages="tes" />
        </MainSection>
      </GridWrapper>
    </>
  );
}
