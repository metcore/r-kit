import dedent from "dedent";
import { Switch } from "../../components/switch";
import illust from "../assets/images/forms.png";
import GridWrapper from "../components/GridWrapper";
import HeroSection from "../components/HeroSection";
import MainSection from "../components/MainSection";
import DashboardLayout from "../layouts/DashboardLayout";
import Footer from "../components/Footer";

export const SwitchPage = () => {
  // const [checked, setChecked] = useState(false);

  const defaultExample = dedent(`
    <div className="flex flex-row gap-8">
      <Switch />
      <Switch checked />
      <Switch disabled />
      <Switch checked disabled />
    </div>
  `);

  const defaultHorizontalExample = dedent(`
    <div className="flex flex-row gap-8">
      <Switch />
      <Switch checked />
      <Switch disabled />
      <Switch checked disabled />
    </div>
  `);

  const defaultVerticalExample = dedent(`
    <div className="flex flex-row gap-8">
      <Switch label="Default" direction="vertical" />
      <Switch checked label="Active" direction="vertical" />
      <Switch disabled label="Disable Default" direction="vertical" />
      <Switch
        checked
        disabled
        label="Disabled Active"
        direction="vertical"
      />
    </div>
  `);

  const verticalReverseExample = dedent(`
    <div className="flex flex-row gap-8">
      <Switch label="Default" direction="vertical-reverse" />
      <Switch checked label="Active" direction="vertical-reverse" />
      <Switch
        disabled
        label="Disable Default"
        direction="vertical-reverse"
      />
      <Switch
        checked
        disabled
        label="Disabled Active"
        direction="vertical-reverse"
      />
    </div>
  `);

  const horizontalReverseExample = dedent(`
    <div className="flex flex-row gap-8">
      <Switch label="Default" direction="horizontal-reverse" />
      <Switch checked label="Active" direction="horizontal-reverse" />
      <Switch
        disabled
        label="Disable Default"
        direction="horizontal-reverse"
      />
      <Switch
        checked
        disabled
        label="Disabled Active"
        direction="horizontal-reverse"
      />
    </div>
  `);

  const validasiExample = dedent(`
    <div className="flex flex-row gap-8">
      <Switch label="Default" errorMessages={"Error Message"} />
      <Switch checked label="Active" errorMessages={"Error Message"} />
    </div>
  `);

  const sizeExample = dedent(`
    <div className="flex flex-row gap-8">
      <Switch size="sm" label="Small (sm)" checked />
      <Switch size="md" label="Medium (md)" checked />
      <Switch size="lg" label="Large (lg)" checked />
    </div>
  `);

  const colorsExample = dedent(`
    <div className="flex flex-row gap-8">
      <Switch checked />
      <Switch color="danger" checked />
      <Switch color="gray" checked />
      <Switch color="info" checked />
      <Switch color="orange" checked />
      <Switch color="primary" checked />
      <Switch color="purple" checked />
      <Switch color="secondary" checked />
      <Switch color="success" checked />
      <Switch color="warning" checked />
    </div>
  `);

  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Switches"
        description="Kontrol on/off yang memberi user cara instan untuk mengubah status sebuah fungsi."
      />

      <div className="flex flex-col gap-8">
        <GridWrapper>
          <MainSection
            title="Switches"
            code={defaultExample}
            className="col-span-2"
          >
            <div className="flex flex-row gap-8">
              <Switch />
              <Switch checked />
              <Switch disabled />
              <Switch checked disabled />
            </div>
          </MainSection>
          {/* direction */}
          <MainSection
            title="Default Switches Horizontal"
            code={defaultHorizontalExample}
          >
            <div className="flex flex-row gap-8">
              <Switch label="Default" />
              <Switch checked label="Active" />
              <Switch disabled label="Disable Default" />
              <Switch checked disabled label="Disabled Active" />
            </div>
          </MainSection>
          <MainSection
            title="Default Switches Vertical"
            code={defaultVerticalExample}
          >
            <div className="flex flex-row gap-8">
              <Switch label="Default" direction="vertical" />
              <Switch checked label="Active" direction="vertical" />
              <Switch disabled label="Disable Default" direction="vertical" />
              <Switch
                checked
                disabled
                label="Disabled Active"
                direction="vertical"
              />
            </div>
          </MainSection>
          {/* direction end */}
          {/* revers direction */}
          <MainSection
            title="Switches Horizontal Reverse"
            code={horizontalReverseExample}
          >
            <div className="flex flex-row gap-8">
              <Switch label="Default" direction="horizontal-reverse" />
              <Switch checked label="Active" direction="horizontal-reverse" />
              <Switch
                disabled
                label="Disable Default"
                direction="horizontal-reverse"
              />
              <Switch
                checked
                disabled
                label="Disabled Active"
                direction="horizontal-reverse"
              />
            </div>
          </MainSection>
          <MainSection
            title="Switches Vertical Reverse"
            code={verticalReverseExample}
          >
            <div className="flex flex-row gap-8">
              <Switch label="Default" direction="vertical-reverse" />
              <Switch checked label="Active" direction="vertical-reverse" />
              <Switch
                disabled
                label="Disable Default"
                direction="vertical-reverse"
              />
              <Switch
                checked
                disabled
                label="Disabled Active"
                direction="vertical-reverse"
              />
            </div>
          </MainSection>
          {/* revers direction end */}
          {/* validation & size */}
          <MainSection title="Switches Validasi" code={validasiExample}>
            <div className="flex flex-row gap-8">
              <Switch label="Default" errorMessages={"Error Message"} />
              <Switch checked label="Active" errorMessages={"Error Message"} />
            </div>
          </MainSection>
          <MainSection title="Switches Size" code={sizeExample}>
            <div className="flex flex-row gap-8">
              <Switch size="sm" label="Small (sm)" checked />
              <Switch size="md" label="Medium (md)" checked />
              <Switch size="lg" label="Large (lg)" checked />
            </div>
          </MainSection>
          {/* validation & size end */}
          <MainSection
            title="Switches Colors"
            code={colorsExample}
            className="col-span-2"
          >
            <div className="flex flex-row gap-8">
              <Switch checked />
              <Switch color="danger" checked />
              <Switch color="gray" checked />
              <Switch color="info" checked />
              <Switch color="orange" checked />
              <Switch color="purple" checked />
              <Switch color="secondary" checked />
              <Switch color="success" checked />
              <Switch color="warning" checked />
            </div>
          </MainSection>
        </GridWrapper>
        <Footer
          backTo="/radio-button"
          backToTitle="Radio Button"
          nextTo="/color-picker"
          title="Switches"
          nextToTitle="Color Picker"
        />
      </div>
    </DashboardLayout>
  );
};
