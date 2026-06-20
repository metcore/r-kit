import { TimePicker } from '../../../components/time-picker/time-picker';
import GridWrapper from '../../components/GridWrapper';
import MainSection from '../../components/MainSection';

export default function TimePickerpage() {
  return (
    <>
      <GridWrapper>
        <MainSection title="default">
          <TimePicker
            initialPosition="5:30"
            onChange={(e) => console.log(e)}
            showAmPm
            use12Hour
          />
        </MainSection>
        <MainSection title="default">
          <TimePicker label="Time" showSeconds={true} />
        </MainSection>
        <MainSection title="default">
          <TimePicker disabled label="Time" />
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
