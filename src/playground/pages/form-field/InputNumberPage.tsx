import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import dedent from 'dedent';
import HeroSection from '../../components/HeroSection';
import GridWrapper from '../../components/GridWrapper';
import Footer from '../../components/Footer';
import { InputNumber } from '../../../components/input/input-number';
import { useState } from 'react';

export default function InputNumberPage() {
  const [basic, setBasic] = useState<number | null>(1234567);
  const [weight, setWeight] = useState<number | null>(null);

  const exampleBasic = dedent(`
    import { InputNumber } from '@herca/r-kit/clients';
    import { useState } from 'react';

    export default function Example() {
      const [value, setValue] = useState<number | null>(1234567);

      return (
        <InputNumber label="Nominal" value={value} onChange={setValue} />
      );
    }
  `);

  const exampleDecimal = dedent(`
    import { InputNumber } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <>
          <InputNumber label="Berat (kg)" decimalScale={2} />
          <InputNumber label="Harga" decimalScale={2} fixedDecimalScale />
        </>
      );
    }
  `);

  const examplePrefix = dedent(`
    import { InputNumber } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <>
          <InputNumber label="Gaji" prefix="Rp " decimalScale={0} />
          <InputNumber label="Diskon" suffix=" %" decimalScale={2} max={100} />
        </>
      );
    }
  `);

  const exampleMinMax = dedent(`
    import { InputNumber } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <InputNumber
          label="Jumlah"
          hint="Antara 1 sampai 999, dicek saat blur."
          min={1}
          max={999}
          decimalScale={0}
          allowNegative={false}
        />
      );
    }
  `);

  const exampleSeparator = dedent(`
    import { InputNumber } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <InputNumber
          label="US format"
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={2}
        />
      );
    }
  `);

  const exampleAlign = dedent(`
    import { InputNumber } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <>
          <InputNumber label="Subtotal" prefix="Rp " align="right" defaultValue={1250000} />
          <InputNumber label="Pajak" prefix="Rp " align="right" defaultValue={137500} />
        </>
      );
    }
  `);

  const exampleStates = dedent(`
    import { InputNumber } from '@herca/r-kit/clients';

    export default function Example() {
      return (
        <>
          <InputNumber label="Clearable" defaultValue={2500} clearAble />
          <InputNumber label="Disabled" defaultValue={2500} disabled />
          <InputNumber
            label="Invalid"
            required
            errorMessages="Nominal wajib diisi."
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
        subtitle="Input Number"
        description="Isian angka dengan format ribuan, desimal, prefix, dan suffix. Nilainya tetap number murni."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection
            title="Basic Input Number"
            className="flex-1"
            code={exampleBasic}
          >
            <InputNumber label="Nominal" value={basic} onChange={setBasic} />
            <p className="text-sm text-gray-600">
              value: <code>{JSON.stringify(basic)}</code>
            </p>
          </MainSection>
          <MainSection title="Decimal" className="flex-1" code={exampleDecimal}>
            <InputNumber
              label="Berat (kg)"
              decimalScale={2}
              value={weight}
              onChange={setWeight}
            />
            <p className="text-sm text-gray-600">
              value: <code>{JSON.stringify(weight)}</code>
            </p>
            <InputNumber
              label="Harga"
              decimalScale={2}
              fixedDecimalScale
              defaultValue={1500}
            />
          </MainSection>
          <MainSection
            title="Prefix & Suffix"
            className="flex-1"
            code={examplePrefix}
          >
            <InputNumber
              label="Gaji"
              prefix="Rp "
              decimalScale={0}
              defaultValue={8500000}
            />
            <InputNumber
              label="Diskon"
              suffix=" %"
              decimalScale={2}
              max={100}
            />
          </MainSection>
          <MainSection
            title="Min & Max"
            className="flex-1"
            code={exampleMinMax}
          >
            <InputNumber
              label="Jumlah"
              hint="Antara 1 sampai 999, dicek saat blur."
              min={1}
              max={999}
              decimalScale={0}
              allowNegative={false}
            />
          </MainSection>
          <MainSection
            title="Custom Separator"
            className="flex-1"
            code={exampleSeparator}
          >
            <InputNumber
              label="US format"
              thousandSeparator=","
              decimalSeparator="."
              decimalScale={2}
            />
          </MainSection>
          <MainSection
            title="Align Right"
            className="flex-1"
            code={exampleAlign}
          >
            <InputNumber
              label="Subtotal"
              prefix="Rp "
              align="right"
              defaultValue={1250000}
            />
            <InputNumber
              label="Pajak"
              prefix="Rp "
              align="right"
              defaultValue={137500}
            />
          </MainSection>
          <MainSection title="States" className="flex-1" code={exampleStates}>
            <InputNumber label="Clearable" defaultValue={2500} clearAble />
            <InputNumber label="Disabled" defaultValue={2500} disabled />
            <InputNumber
              label="Invalid"
              required
              errorMessages="Nominal wajib diisi."
            />
          </MainSection>
        </GridWrapper>

        <Footer
          title="Input Number"
          backTo="/playground/input-phone-number"
          backToTitle="Input Phone Number"
          nextTo="/playground/drawing"
          nextToTitle="Drawing"
        />
      </div>
    </>
  );
}
