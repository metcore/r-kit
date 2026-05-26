import { Card, CardBody } from '../../../components/card';
import { Checkbox, CheckboxGroup } from '../../../components/checkbox/checkbox';
import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import useCheckboxes from '../../hooks/useCheckboxes';
import { useMarkdown } from '../../hooks/useMarkdown';
import GridWrapper from '../../components/GridWrapper';
import Footer from '../../components/Footer';
import HeroSection from '../../components/HeroSection';

export default function CheckboxPage() {
  const { doc } = useMarkdown(`/docs/checkbox.md`);
  const {
    CHECKBOXES,
    SIZE_CHECKBOXES,
    exampleDefault,
    exampleHorizontal,
    exampleHorizontal2,
    exampleVerticalMinus,
    exampleVerticalDescription,
  } = useCheckboxes();

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
          <MainSection title="Checkbox Default" code={exampleDefault}>
            <CheckboxGroup direction="horizontal" defaultValue={[1, '2']}>
              {CHECKBOXES.map(({ id, color, disabled, checked }) => (
                <Checkbox
                  key={id}
                  value={id}
                  color={color}
                  disabled={disabled}
                  checked={checked}
                />
              ))}
            </CheckboxGroup>
          </MainSection>
          <MainSection title="Checkbox Inderminate" code={exampleDefault}>
            <CheckboxGroup direction="horizontal" defaultValue={[1, '2']}>
              {CHECKBOXES.map(({ id, color, disabled }) => (
                <Checkbox
                  key={id}
                  value={id}
                  icon="minus"
                  color={color}
                  disabled={disabled}
                />
              ))}
            </CheckboxGroup>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection
            title="Checkbox with Text"
            code={exampleHorizontal}
            className="flex-1"
          >
            <CheckboxGroup direction="horizontal" defaultValue={['3', '4']}>
              {CHECKBOXES.map((item) => (
                <Checkbox
                  key={item.id}
                  value={item.id}
                  label={item.label}
                  color={item.color}
                  disabled={item.disabled}
                />
              ))}
            </CheckboxGroup>
          </MainSection>

          <MainSection
            title="Checbox With Description"
            code={exampleHorizontal2}
            className="flex-1"
          >
            <CheckboxGroup
              direction="horizontal"
              defaultValue={['1', '2', '3', '4']}
            >
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
              defaultValue={['1', '2', '3', '4']}
            >
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
            </CheckboxGroup>
          </MainSection>

          <MainSection
            title="Checkbox Size"
            code={exampleVerticalDescription}
            className="flex-1"
          >
            <CheckboxGroup
              direction="horizontal"
              defaultValue={['1', '2', '3', '4']}
            >
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
            </CheckboxGroup>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection
            title="Vertical"
            code={exampleVerticalMinus}
            className="flex-1"
          >
            <CheckboxGroup defaultValue={['1', '2', '3', '4']}>
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
            </CheckboxGroup>
          </MainSection>
        </GridWrapper>

        <Card>
          <CardBody>
            <MarkdownRenderer content={doc?.content ?? ''} />
          </CardBody>
        </Card>

        {/* footer */}
        <Footer
          title="Checkbox"
          nextTo="/input-field"
          nextToTitle="Input Field"
        />
      </div>
    </>
  );
}
