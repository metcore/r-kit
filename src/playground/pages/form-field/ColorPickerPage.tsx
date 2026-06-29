import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import GridWrapper from '../../components/GridWrapper';
import Footer from '../../components/Footer';
import HeroSection from '../../components/HeroSection';
import dedent from 'dedent';
import ColorInput from '../../../components/collor-picker/color-picker';

export default function ColorPickerPage() {
  const exampleBasic = dedent(`
    import { ColorInput } from '@herca/r-kit/clients';

    export default function Example() {
      return <ColorInput />;
    }
  `);
  const exampleLabel = dedent(`
    import { ColorInput } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <ColorInput
          label="Input Color"
          placeholder="Choose color"
        />
      );
    }
  `);
  const exampleRequired = dedent(`
    import { ColorInput } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <ColorInput
          label="Input Color"
          placeholder="Choose color"
          hint="Message for hint"
          required
        />
      );
    }
  `);
  const exampleDisabled = dedent(`
    import { ColorInput } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <ColorInput
          label="Input Color"
          placeholder="Choose color"
          disabled
        />
      );
    }
  `);
  const exampleInvalid = dedent(`
    import { ColorInput } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <ColorInput
          label="Input Color"
          placeholder="Choose color"
          errorMessages="This field is required."
        />
      );
    }
  `);
  const exampleTooltip = dedent(`
    import { ColorInput } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <ColorInput
          label="Input Color"
          placeholder="Choose color"
          tooltip="Please change a color"
          hint="Message for hint"
        />
      );
    }
  `);
  const exampleSizes = dedent(`
    import { ColorInput } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <>
          <ColorInput
            label="Small"
            size="sm"
          />

          <ColorInput
            label="Medium"
            size="md"
          />

          <ColorInput
            label="Large"
            size="lg"
          />
        </>
      );
    }
  `);
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
          <MainSection title="Color picker default" code={exampleBasic}>
            <ColorInput />
          </MainSection>
          <MainSection title="Color picker with label">
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              label="Input Color"
            />
          </MainSection>
          <MainSection title="Color picker with label" code={exampleLabel}>
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              label="Input Color"
            />
          </MainSection>
          <MainSection title="Color picker required" code={exampleRequired}>
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              required
              hint="Message for hint"
              label="Input Color"
            />
          </MainSection>
          <MainSection title="Color picker disabled" code={exampleDisabled}>
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              required
              disabled
              hint="Message for hint"
              label="Input Color"
            />
          </MainSection>
          <MainSection title="Color picker invalid" code={exampleInvalid}>
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              required
              errorMessages="This field is required."
              hint="Message for hint"
              label="Input Color"
            />
          </MainSection>
          <MainSection title="Color picker with tooltip" code={exampleTooltip}>
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              hint="Message for hint"
              label="Input Color"
              tooltip="Please change a color"
              size="md"
            />
          </MainSection>
          <MainSection title="Color picker size" code={exampleSizes}>
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              hint="Message for hint"
              label="Input Color"
              tooltip="Please change a color"
              errorMessages="Error validation"
              size="sm"
            />
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              hint="Message for hint"
              label="Input Color"
              tooltip="Please change a color"
              errorMessages="Error validation"
              size="md"
            />
            <ColorInput
              onChange={(e) => console.log(e)}
              placeholder="Tes"
              hint="Message for hint"
              label="Input Color"
              tooltip="Please change a color"
              errorMessages="Error validation"
              size="lg"
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
