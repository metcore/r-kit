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
import { useState } from 'react';

export default function CheckboxPage() {
  const [chekedBasic, setChekedBasic] = useState<boolean>(false);
  const [chekedIndeminate, setChekedIndeminate] = useState<boolean>(false);
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

  const handleOnCheckedParent = () => {};

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
            <Checkbox
              onChange={setChekedBasic}
              label={chekedBasic ? 'cheked' : 'UnCheked'}
            />
          </MainSection>
          <MainSection title="Checkbox Inderminate" code={exampleDefault}>
            <Checkbox
              value={1}
              icon="minus"
              onChange={setChekedIndeminate}
              label={chekedIndeminate ? 'cheked' : 'UnCheked'}
            />
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
            title="Checkbox Validation"
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
                  errorMessages="Invalid Text"
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
          <MainSection
            title="Checkbox With Tooltip"
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
                  tooltip="Tooltip Text"
                  color={item.color}
                  disabled={item.disabled}
                />
              ))}
            </CheckboxGroup>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection
            title="Grouping"
            code={exampleVerticalMinus}
            className="flex-1"
          >
            <div className="flex flex-col gap-4">
              <Checkbox
                label="Parent"
                onCheckedChange={handleOnCheckedParent}
              />
              <div className="ml-6 flex flex-col">
                <CheckboxGroup defaultValue={['1', '2', '3', '4']}>
                  {SIZE_CHECKBOXES.map((item) => (
                    <Checkbox
                      key={item.id}
                      label={item.label}
                      description={item.description}
                      color={item.color}
                      checked={true}
                      disabled={item.disabled}
                    />
                  ))}
                </CheckboxGroup>
              </div>
            </div>
          </MainSection>
          <MainSection
            title="Checkbox With Tooltip"
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
                  tooltip="Tooltip Text"
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
