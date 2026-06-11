import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import GridWrapper from '../../components/GridWrapper';
import Footer from '../../components/Footer';
import HeroSection from '../../components/HeroSection';
import { ColorInput } from '../../../components/collor-pirkcer';

export default function ColorPickerPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Checkbox"
        description="Memungkinkan user memilih satu, beberapa, atau tidak memilih opsi sama sekali dari daftar pilihan."
      />

      <div className="flex flex-1 flex-col gap-4">
        <GridWrapper>
          <MainSection title="Color picker default">
            <ColorInput />
          </MainSection>
          <MainSection title="Color picker with label">
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              label="Input Color"
            />
          </MainSection>
          <MainSection title="Color picker with label & Hint">
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              hint="Message for hint"
              label="Input Color"
            />
          </MainSection>
          <MainSection title="Color picker with label & Hint & tooltip">
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              hint="Message for hint"
              label="Input Color"
              tooltip="Please change a color"
              errorMessages="Error validation"
              size="md"
            />
          </MainSection>
        </GridWrapper>

        <Footer
          title="Checkbox"
          nextTo="/input-field"
          nextToTitle="Input Field"
        />
      </div>
    </>
  );
}
