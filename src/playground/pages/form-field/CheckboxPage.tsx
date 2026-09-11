import { Checkbox, CheckboxGroup } from '../../../components/checkbox/checkbox';
import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import useCheckboxes from '../../hooks/useCheckboxes';
import GridWrapper from '../../components/GridWrapper';
import Footer from '../../components/Footer';
import HeroSection from '../../components/HeroSection';
import { useState } from 'react';

export default function CheckboxPage() {
  const [checkedBasic, setCheckedBasic] = useState<boolean>(false);
  const [checkedIndeterminate, setCheckedIndeterminate] =
    useState<boolean>(false);
  const {
    CHECKBOXES,
    SIZE_CHECKBOXES,
    exampleDefault,
    exampleIndeterminate,
    exampleWithText,
    exampleWithDescription,
    exampleValidation,
    exampleSize,
    exampleVertical,
    exampleTooltip,
    exampleGrouping,
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
              onChange={setCheckedBasic}
              label={checkedBasic ? 'Checked' : 'Unchecked'}
            />
          </MainSection>
          <MainSection
            title="Checkbox Indeterminate"
            code={exampleIndeterminate}
          >
            <Checkbox
              value={1}
              icon="minus"
              onChange={setCheckedIndeterminate}
              label={checkedIndeterminate ? 'Checked' : 'Unchecked'}
            />
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection
            title="Checkbox With Text"
            code={exampleWithText}
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
            title="Checkbox With Description"
            code={exampleWithDescription}
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
            code={exampleValidation}
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
            code={exampleSize}
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
            code={exampleVertical}
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
            code={exampleTooltip}
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
            code={exampleGrouping}
            className="flex-1"
          >
            <div className="flex flex-col gap-4">
              <Checkbox label="Parent" onChange={handleOnCheckedParent} />
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
        </GridWrapper>

        <Footer
          title="Checkbox"
          backTo="/playground/colors"
          backToTitle="Color"
          nextTo="/playground/input-field"
          nextToTitle="Input Field"
        />
      </div>
    </>
  );
}
