import HeroSection from "../../components/HeroSection";
import DashboardLayout from "../../layouts/DashboardLayout";
import illust from "../../assets/images/forms.png";
import MainSection from "../../components/MainSection";
import GridWrapper from "../../components/GridWrapper";
import { Counter } from "../../../components/counter";
import { useState } from "react";
import { Icon } from "../../../components/icons";
import { Text } from "../../../components/text";
import Footer from "../../components/Footer";
import dedent from "dedent";

export default function CounterPage() {
  const [defaultValue, setDefaultValue] = useState(1);
  const [decimalValue, setDecimalValue] = useState(1.1);

  const exampleDefault = dedent(`
    <div className="flex gap-8">
      <Counter
        value={String(defaultValue)}
        onChange={(val) => setDefaultValue(Number(val))}
        canMinus
      />
      <Counter
        value={String(defaultValue)}
        onChange={(val) => setDefaultValue(Number(val))}
        variant="secondary"
      />
    </div>
  `);

  const exampleDecimal = dedent(`
    <div className="flex gap-8">
      <Counter
        value={String(decimalValue)}
        onChange={(val) => setDecimalValue(Number(val))}
        canMinus
      />
      <Counter
        value={String(decimalValue)}
        onChange={(val) => setDecimalValue(Number(val))}
        variant="secondary"
      />
    </div>
  `);

  const exampleIcon = dedent(`
    <div className="flex gap-8">
      <Counter
        value={String(defaultValue)}
        onChange={(val) => setDefaultValue(Number(val))}
        iconLeft={
          <Icon name="trash-regular" className="size-5 text-gray-700" />
        }
        canMinus
      />
      <Counter
        value={String(defaultValue)}
        onChange={(val) => setDefaultValue(Number(val))}
        variant="secondary"
        iconLeft={
          <Icon name="trash-regular" className="size-5 text-gray-700" />
        }
      />
    </div>
  `);

  const exampleWidth = dedent(`
      <div className="flex flex-col gap-4">
        <Counter
          className="w-full justify-between"
          value={String(defaultValue)}
          onChange={(val) => setDefaultValue(Number(val))}
          canMinus
        />
        <Counter
          className="w-full justify-between"
          value={String(defaultValue)}
          onChange={(val) => setDefaultValue(Number(val))}
          variant="secondary"
        />
      </div>
    `);

  const exampleDisabled = dedent(`
    <div className="flex gap-8">
      <Counter
        value={String(defaultValue)}
        onChange={(val) => setDefaultValue(Number(val))}
        canMinus
        disabled
      />
      <Counter
        value={String(defaultValue)}
        onChange={(val) => setDefaultValue(Number(val))}
        variant="secondary"
        disabled
      />
    </div>
  `);

  const exampleSize = dedent(`
      <div className="flex flex-col gap-5">
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <Counter
              size="sm"
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              canMinus
            />
            <Text value="Small" className="text-gray-700!" />
          </div>
          <div className="flex flex-col gap-2">
            <Counter
              size="md"
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              canMinus
            />
            <Text value="Medium" className="text-gray-700!" />
          </div>
          <div className="flex flex-col gap-2">
            <Counter
              size="lg"
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              canMinus
            />
            <Text value="Large" className="text-gray-700!" />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <Counter
              size="sm"
              variant="secondary"
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              canMinus
            />
            <Text value="Small" className="text-gray-700!" />
          </div>
          <div className="flex flex-col gap-2">
            <Counter
              size="md"
              variant="secondary"
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              canMinus
            />
            <Text value="Medium" className="text-gray-700!" />
          </div>
          <div className="flex flex-col gap-2">
            <Counter
              size="lg"
              variant="secondary"
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              canMinus
            />
            <Text value="Large" className="text-gray-700!" />
          </div>
        </div>
      </div>
  `);

  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Counter"
        description="Input Field untuk memasukkan nilai angka, lengkap dengan kontrol untuk menaikkan atau menurunkan nilai."
      />

      <GridWrapper>
        <MainSection title="Counter Default" code={exampleDefault}>
          <div className="flex gap-8">
            <Counter
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              canMinus
            />
            <Counter
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              variant="secondary"
            />
          </div>
        </MainSection>

        <MainSection title="Input Decimal" code={exampleDecimal}>
          <div className="flex gap-8">
            <Counter
              value={String(decimalValue)}
              onChange={(val) => setDecimalValue(Number(val))}
              canMinus
            />
            <Counter
              value={String(decimalValue)}
              onChange={(val) => setDecimalValue(Number(val))}
              variant="secondary"
            />
          </div>
        </MainSection>

        <MainSection title="Removable Icon" code={exampleIcon}>
          <div className="flex gap-8">
            <Counter
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              iconLeft={
                <Icon name="trash-regular" className="size-5 text-gray-700" />
              }
              canMinus
            />
            <Counter
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              variant="secondary"
              iconLeft={
                <Icon name="trash-regular" className="size-5 text-gray-700" />
              }
            />
          </div>
        </MainSection>

        <MainSection title="Input Full Width" code={exampleWidth}>
          <div className="flex flex-col gap-4">
            <Counter
              className="w-full justify-between"
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              canMinus
            />
            <Counter
              className="w-full justify-between"
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              variant="secondary"
            />
          </div>
        </MainSection>

        <MainSection title="Input Disabled" code={exampleDisabled}>
          <div className="flex gap-8">
            <Counter
              disabled
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              canMinus
            />
            <Counter
              disabled
              value={String(defaultValue)}
              onChange={(val) => setDefaultValue(Number(val))}
              variant="secondary"
            />
          </div>
        </MainSection>

        <MainSection
          title="Counter Size"
          contentClassName="flex flex-col gap-5"
          code={exampleSize}
        >
          <div className="flex items-end gap-8">
            <div className="flex flex-col gap-2">
              <Counter
                size="sm"
                value={String(defaultValue)}
                onChange={(val) => setDefaultValue(Number(val))}
                canMinus
              />

              <Text value="Small" className="text-gray-700!" />
            </div>
            <div className="flex flex-col gap-2">
              <Counter
                size="md"
                value={String(defaultValue)}
                onChange={(val) => setDefaultValue(Number(val))}
                canMinus
              />

              <Text value="Medium" className="text-gray-700!" />
            </div>
            <div className="flex flex-col gap-2">
              <Counter
                size="lg"
                value={String(defaultValue)}
                onChange={(val) => setDefaultValue(Number(val))}
                canMinus
              />

              <Text value="Large" className="text-gray-700!" />
            </div>
          </div>

          <div className="flex items-end gap-8">
            <div className="flex flex-col gap-2">
              <Counter
                size="sm"
                variant="secondary"
                value={String(defaultValue)}
                onChange={(val) => setDefaultValue(Number(val))}
                canMinus
              />

              <Text value="Small" className="text-gray-700!" />
            </div>
            <div className="flex flex-col gap-2">
              <Counter
                size="md"
                variant="secondary"
                value={String(defaultValue)}
                onChange={(val) => setDefaultValue(Number(val))}
                canMinus
              />

              <Text value="Medium" className="text-gray-700!" />
            </div>
            <div className="flex flex-col gap-2">
              <Counter
                size="lg"
                variant="secondary"
                value={String(defaultValue)}
                onChange={(val) => setDefaultValue(Number(val))}
                canMinus
              />

              <Text value="Large" className="text-gray-700!" />
            </div>
          </div>
        </MainSection>
      </GridWrapper>

      <Footer
        title="Counter"
        backTo="/input-group"
        backToTitle="Input Group"
        nextTo="/input-file"
        nextToTitle="Input File"
      />
    </DashboardLayout>
  );
}
