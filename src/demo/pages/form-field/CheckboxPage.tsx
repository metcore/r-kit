import { Card, CardBody } from "../../../components/card";
import { Checkbox, CheckboxGroup } from "../../../components/checkbox/checkbox";
import illust from "../../assets/images/forms.png";
import Footer from "../../components/Footer";
import GridWrapper from "../../components/GridWrapper";
import HeroSection from "../../components/HeroSection";
import MainSection from "../../components/MainSection";
import MarkdownRenderer from "../../components/MarkdownRenderer";
import useCheckboxes from "../../hooks/useCheckboxes";
import { useMarkdown } from "../../hooks/useMarkdown";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function CheckboxPage() {
  const { doc } = useMarkdown(`/docs/checkbox.md`);
  const {
    CHECKBOXES,
    SIZE_CHECKBOXES,
    exampleDefault,
    exampleHorizontal,
    exampleHorizontal2,
    exampleDescription,
    exampleVerticalActive,
    exampleVerticalMinus,
    exampleVerticalUnActive,
    exampleVerticalDescription,
  } = useCheckboxes();

  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Checkbox"
        description="Memungkinkan user memilih satu, beberapa, atau tidak memilih opsi sama sekali dari daftar pilihan."
      />

      <div className="flex flex-1 flex-col gap-4">
        <MainSection title="Checkbox" code={exampleDefault}>
          <CheckboxGroup direction="horizontal">
            {CHECKBOXES.map(({ id, color, disabled }) => (
              <Checkbox key={id} value={id} color={color} disabled={disabled} />
            ))}
          </CheckboxGroup>
        </MainSection>

        {/* checkbox horizontal active & non active */}
        <GridWrapper>
          <MainSection
            title="Checkbox Horizontal with Text Active"
            code={exampleHorizontal}
            className="flex-1"
          >
            <CheckboxGroup
              direction="horizontal"
              defaultValue={["1", "2", "3", "4"]}
            >
              <div className="flex flex-row items-center gap-8">
                {CHECKBOXES.map((item) => (
                  <Checkbox
                    key={item.id}
                    value={item.id}
                    label={item.label}
                    color={item.color}
                    disabled={item.disabled}
                  />
                ))}
              </div>
            </CheckboxGroup>
          </MainSection>

          <MainSection
            title="Checkbox Horizontal inderminate"
            code={exampleHorizontal2}
            className="flex-1"
          >
            <CheckboxGroup
              direction="horizontal"
              defaultValue={["1", "2", "3", "4"]}
            >
              <div className="flex flex-row items-center gap-8">
                {CHECKBOXES.map((item) => (
                  <Checkbox
                    icon="minus"
                    key={item.id}
                    value={item.id}
                    label={item.label}
                    color={item.color}
                    disabled={item.disabled}
                  />
                ))}
              </div>
            </CheckboxGroup>
          </MainSection>
        </GridWrapper>

        {/* checkbox with description */}
        <MainSection
          title="Checkbox Horizontal with Deskripsi"
          code={exampleDescription}
          className="flex-1"
        >
          <CheckboxGroup
            direction="horizontal"
            defaultValue={["1", "2", "3", "4"]}
          >
            <div className="flex flex-row items-center gap-8">
              {CHECKBOXES.map((item) => (
                <Checkbox
                  key={item.id}
                  value={item.id}
                  label={item.label}
                  color={item.color}
                  disabled={item.disabled}
                  description={item.description}
                />
              ))}
            </div>
          </CheckboxGroup>
        </MainSection>

        {/* checkbox vetical active & non active */}
        <GridWrapper>
          <MainSection
            title="Checkbox Vertical with Text UnActive"
            code={exampleVerticalActive}
            className="flex-1"
          >
            <CheckboxGroup direction="horizontal">
              <div className="flex flex-row items-center gap-8">
                {CHECKBOXES.map((item) => (
                  <Checkbox
                    vertical
                    key={item.id}
                    label={item.label}
                    color={item.color}
                    disabled={item.disabled}
                  />
                ))}
              </div>
            </CheckboxGroup>
          </MainSection>

          <MainSection
            title="Checkbox Vertical with Text Active"
            code={exampleVerticalUnActive}
            className="flex-1"
          >
            <CheckboxGroup
              direction="horizontal"
              defaultValue={["1", "2", "3", "4"]}
            >
              <div className="flex flex-row items-center gap-8">
                {CHECKBOXES.map((item) => (
                  <Checkbox
                    vertical
                    key={item.id}
                    value={item.id}
                    label={item.label}
                    color={item.color}
                    disabled={item.disabled}
                  />
                ))}
              </div>
            </CheckboxGroup>
          </MainSection>
        </GridWrapper>

        {/* vertical icon minus active & non active */}
        <GridWrapper>
          <MainSection
            title="Checkbox Vertical Inderminate"
            code={exampleVerticalMinus}
            className="flex-1"
          >
            <CheckboxGroup
              direction="horizontal"
              defaultValue={["1", "2", "3", "4"]}
            >
              <div className="flex flex-row items-center gap-8">
                {CHECKBOXES.map((item) => (
                  <Checkbox
                    vertical
                    icon="minus"
                    key={item.id}
                    value={item.id}
                    label={item.label}
                    color={item.color}
                    disabled={item.disabled}
                  />
                ))}
              </div>
            </CheckboxGroup>
          </MainSection>

          <MainSection
            title="Checkbox Vertical with Description"
            code={exampleVerticalDescription}
            className="flex-1"
          >
            <CheckboxGroup
              direction="horizontal"
              defaultValue={["1", "2", "3", "4"]}
            >
              <div className="flex flex-row items-center gap-8">
                {CHECKBOXES.map((item) => (
                  <Checkbox
                    vertical
                    key={item.id}
                    value={item.id}
                    label={item.label}
                    description="Helper text messages"
                    color={item.color}
                    disabled={item.disabled}
                  />
                ))}
              </div>
            </CheckboxGroup>
          </MainSection>
        </GridWrapper>

        {/* sizes */}
        <GridWrapper>
          <MainSection
            title="Checkbox Size Horizontal"
            code={exampleVerticalMinus}
            className="flex-1"
          >
            <CheckboxGroup
              direction="horizontal"
              defaultValue={["1", "2", "3", "4"]}
            >
              <div className="flex flex-row items-center gap-8">
                {SIZE_CHECKBOXES.map((item) => (
                  <Checkbox
                    key={item.id}
                    value={item.id}
                    size={item.size}
                    label={item.label}
                    description={item.description}
                    color={item.color}
                    disabled={item.disabled}
                  />
                ))}
              </div>
            </CheckboxGroup>
          </MainSection>

          <MainSection
            title="Checkbox Size Vertical"
            code={exampleVerticalDescription}
            className="flex-1"
          >
            <CheckboxGroup
              direction="horizontal"
              defaultValue={["1", "2", "3", "4"]}
            >
              <div className="flex flex-row items-center gap-8">
                {SIZE_CHECKBOXES.map((item) => (
                  <Checkbox
                    vertical
                    key={item.id}
                    value={item.id}
                    size={item.size}
                    label={item.label}
                    description={item.description}
                    color={item.color}
                    disabled={item.disabled}
                  />
                ))}
              </div>
            </CheckboxGroup>
          </MainSection>
        </GridWrapper>

        <Card>
          <CardBody>
            <MarkdownRenderer content={doc?.content || ""} />
          </CardBody>
        </Card>

        {/* footer */}
        <Footer
          title="Checkbox"
          nextTo="/input-field"
          nextToTitle="Input Field"
        />
      </div>
    </DashboardLayout>
  );
}
