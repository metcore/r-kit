import dedent from 'dedent';
import illust from '../../../assets/images/forms.png';
import { Drawing } from '../../../components/drawing';
import Footer from '../../components/Footer';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';

export const DrawingPage = () => {
  const defaultExample = dedent(`
    <Drawing
      required
      height={200}
    />
  `);

  const labelHelperExample = dedent(`
    <Drawing
      label="Label"
      hint="Helper text"
      height={200}
    />
  `);

  const requiredExample = dedent(`
    <Drawing
      label="Label"
      required
      hint="Helper text"
      height={200}
    />
  `);

  const disabledExample = dedent(`
    <Drawing
      label="Label"
      disabled
      height={200}
    />
  `);

  const invalidExample = dedent(`
    <Drawing
      label="Label"
      errorMessages="Signature is required."
      hint="Helper text"
      height={200}
    />
  `);

  const actionsExample = dedent(`
    <Drawing
      showActions
      label="Label"
      hint="Helper text"
      height={200}
    />
  `);

  const tooltipExample = dedent(`
    <Drawing
      showActions
      label="Label"
      hint="Helper text"
      height={200}
      tooltip="Signature"
    />
  `);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Drawing"
        description="Kanvas gambar bebas untuk tanda tangan atau coretan, mendukung input mouse maupun sentuh, serta ekspor ke data URL / Blob."
      />

      <div className="flex flex-col gap-8">
        <GridWrapper>
          <MainSection title="Default" code={defaultExample}>
            <Drawing required height={200} />
          </MainSection>

          <MainSection
            title="Drawing with Label & helper text"
            code={labelHelperExample}
          >
            <Drawing
              label="Label"
              placeholder="Draw your signature here"
              hint="helper text"
              height={200}
              strokeColor="#000"
              onChange={(e) => console.log(e)}
            />
          </MainSection>

          <MainSection title="Drawing Required" code={requiredExample}>
            <Drawing label="Label" required hint="Helper text" height={200} />
          </MainSection>

          <MainSection title="Disabled" code={disabledExample}>
            <Drawing label="Label" disabled hint="Helper text" height={200} />
          </MainSection>

          <MainSection title="Invalid" code={invalidExample}>
            <Drawing
              label="Label"
              errorMessages="Invalid Text."
              placeholder="Draw your signature here"
              hint="Helper text"
              height={200}
            />
          </MainSection>

          <MainSection title="Drawing with Actions" code={actionsExample}>
            <Drawing
              showActions
              label="Label"
              placeholder="Draw your signature here"
              hint="Helper text"
              height={200}
            />
          </MainSection>

          <MainSection title="Drawing with Tooltip" code={tooltipExample}>
            <Drawing
              showActions
              label="Label"
              placeholder="Draw your signature here"
              hint="Helper text"
              height={200}
              tooltip="Yea"
            />
          </MainSection>
        </GridWrapper>

        <Footer
          backTo="/slider"
          backToTitle="Slider"
          nextTo="/color-picker"
          title="Drawing"
          nextToTitle="Color Picker"
        />
      </div>
    </>
  );
};
