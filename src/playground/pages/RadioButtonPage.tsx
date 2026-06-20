import React from 'react';
import dedent from 'dedent';

import { RadioGroup, Radio } from '../../components/radio';
import { CheckboxGroup } from '../../clients';

import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import GridWrapper from '../components/GridWrapper';
import Footer from '../components/Footer';

import illust from '../../assets/images/forms.png';

export default function RadioButtonPage() {
  const [value1, setValue1] = React.useState('option1');

  const codeBasic = dedent(`
    import { useState } from 'react';
    import { RadioGroup, Radio } from '@herca/r-kit/clients';

    export default function Example() {
      const [value, setValue] = useState('option1');

      return (
        <RadioGroup
          value={value}
          onValueChange={setValue}
        >
          <Radio
            value="option1"
            label="Option 1"
          />
          <Radio
            value="option2"
            label="Option 2"
          />
        </RadioGroup>
      );
    }
  `);

  const codeLabel = dedent(`
    import { useState } from 'react';
    import { RadioGroup, Radio } from '@herca/r-kit/clients';

    export default function Example() {
      const [value, setValue] = useState('option1');

      return (
        <RadioGroup
          label="Radio Button"
          value={value}
          onValueChange={setValue}
        >
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );
    }
  `);

  const codeTooltip = dedent(`
    import { useState } from 'react';
    import { RadioGroup, Radio } from '@herca/r-kit/clients';

    export default function Example() {
      const [value, setValue] = useState('option1');

      return (
        <RadioGroup
          label="Radio Button"
          tooltip="Select one option"
          value={value}
          onValueChange={setValue}
        >
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );
    }
  `);

  const codeHintDescription = dedent(`
    import { useState } from 'react';
    import { RadioGroup, Radio } from '@herca/r-kit/clients';

    export default function Example() {
      const [value, setValue] = useState('option1');

      return (
        <RadioGroup
          label="Payment Method"
          description="Choose one payment method"
          hint="All payment methods are secure"
          value={value}
          onValueChange={setValue}
        >
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );
    }
  `);

  const codeItemDescription = dedent(`
    import { useState } from 'react';
    import { RadioGroup, Radio } from '@herca/r-kit/clients';

    export default function Example() {
      const [value, setValue] = useState('credit');

      return (
        <RadioGroup
          label="Payment Method"
          value={value}
          onValueChange={setValue}
        >
          <Radio
            value="credit"
            label="Credit Card"
            description="Visa, Mastercard"
          />

          <Radio
            value="bank"
            label="Bank Transfer"
            description="BCA, Mandiri, BNI"
          />

          <Radio
            value="wallet"
            label="E-Wallet"
            description="OVO, GoPay, Dana"
          />
        </RadioGroup>
      );
    }
  `);

  const codeError = dedent(`
    import { useState } from 'react';
    import { RadioGroup, Radio } from '@herca/r-kit/clients';

    export default function Example() {
      const [value, setValue] = useState('');

      return (
        <RadioGroup
          label="Payment Method"
          errorMessages="Please choose one option"
          value={value}
          onValueChange={setValue}
        >
          <Radio value="credit" label="Credit Card" />
          <Radio value="bank" label="Bank Transfer" />
        </RadioGroup>
      );
    }
  `);

  const codeHorizontal = dedent(`
    import { useState } from 'react';
    import { RadioGroup, Radio } from '@herca/r-kit/clients';

    export default function Example() {
      const [value, setValue] = useState('credit');

      return (
        <RadioGroup
          direction="horizontal"
          label="Payment Method"
          value={value}
          onValueChange={setValue}
        >
          <Radio value="credit" label="Credit Card" />
          <Radio value="bank" label="Bank Transfer" />
          <Radio value="wallet" label="E-Wallet" />
        </RadioGroup>
      );
    }
  `);

  const codeDisabled = dedent(`
    import { useState } from 'react';
    import { RadioGroup, Radio } from '@herca/r-kit/clients';

    export default function Example() {
      const [value, setValue] = useState('credit');

      return (
        <RadioGroup
          disabled
          value={value}
          onValueChange={setValue}
        >
          <Radio value="credit" label="Credit Card" />
          <Radio value="bank" label="Bank Transfer" />
        </RadioGroup>
      );
    }
  `);

  const codeRequired = dedent(`
    import { useState } from 'react';
    import { RadioGroup, Radio } from '@herca/r-kit/clients';

    export default function Example() {
      const [value, setValue] = useState('');

      return (
        <RadioGroup
          required
          label="Payment Method"
          value={value}
          onValueChange={setValue}
        >
          <Radio value="credit" label="Credit Card" />
          <Radio value="bank" label="Bank Transfer" />
        </RadioGroup>
      );
    }
  `);

  const codeColor = dedent(`
    import { useState } from 'react';
    import { RadioGroup, Radio } from '@herca/r-kit/clients';

    export default function Example() {
      const [value, setValue] = useState('option1');

      return (
        <RadioGroup
          color="success"
          value={value}
          onValueChange={setValue}
        >
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );
    }
  `);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Radio Button"
        description="Memungkinkan user memilih satu opsi dari beberapa pilihan."
      />

      <GridWrapper>
        <MainSection title="Basic" code={codeBasic}>
          <CheckboxGroup direction="horizontal">
            <RadioGroup
              value={value1}
              onValueChange={setValue1}
              color="primary"
            >
              <Radio value="option1" label="Value" />
              <Radio value="option2" label="Value2" />
            </RadioGroup>
          </CheckboxGroup>
        </MainSection>

        <MainSection title="Label" code={codeLabel}>
          <RadioGroup
            value={value1}
            onValueChange={setValue1}
            label="Radio Button"
          >
            <Radio value="option1" label="Value" />
            <Radio value="option2" label="Value2" />
          </RadioGroup>
        </MainSection>

        <MainSection title="Tooltip" code={codeTooltip}>
          <RadioGroup
            value={value1}
            onValueChange={setValue1}
            tooltip="Select one option"
            label="Radio Button"
          >
            <Radio value="option1" label="Value" />
            <Radio value="option2" label="Value2" />
          </RadioGroup>
        </MainSection>

        <MainSection title="Hint & Description" code={codeHintDescription}>
          <RadioGroup
            value={value1}
            onValueChange={setValue1}
            description="Choose one payment method"
            hint="All payment methods are secure"
            label="Radio Button"
          >
            <Radio value="option1" label="Value" />
            <Radio value="option2" label="Value2" />
          </RadioGroup>
        </MainSection>

        <MainSection title="Item Description" code={codeItemDescription}>
          <RadioGroup
            value={value1}
            onValueChange={setValue1}
            label="Payment Method"
          >
            <Radio
              value="credit"
              label="Credit Card"
              description="Visa, Mastercard"
            />
            <Radio
              value="bank"
              label="Bank Transfer"
              description="BCA, Mandiri"
            />
            <Radio value="wallet" label="E-Wallet" description="OVO, Dana" />
          </RadioGroup>
        </MainSection>

        <MainSection title="Error Message" code={codeError}>
          <RadioGroup
            value={value1}
            onValueChange={setValue1}
            errorMessages="Please choose one option"
            label="Radio Button"
          >
            <Radio value="option1" label="Value" />
            <Radio value="option2" label="Value2" />
          </RadioGroup>
        </MainSection>

        <MainSection title="Horizontal" code={codeHorizontal}>
          <RadioGroup
            direction="horizontal"
            value={value1}
            onValueChange={setValue1}
            label="Radio Button"
          >
            <Radio value="option1" label="Value" />
            <Radio value="option2" label="Value2" />
            <Radio value="option3" label="Value3" />
          </RadioGroup>
        </MainSection>

        <MainSection title="Disabled" code={codeDisabled}>
          <RadioGroup disabled value={value1} onValueChange={setValue1}>
            <Radio value="option1" label="Value" />
            <Radio value="option2" label="Value2" />
          </RadioGroup>
        </MainSection>

        <MainSection title="Required" code={codeRequired}>
          <RadioGroup
            required
            value={value1}
            onValueChange={setValue1}
            label="Radio Button"
          >
            <Radio value="option1" label="Value" />
            <Radio value="option2" label="Value2" />
          </RadioGroup>
        </MainSection>

        <MainSection title="Color Variant" code={codeColor}>
          <RadioGroup color="success" value={value1} onValueChange={setValue1}>
            <Radio value="option1" label="Value" />
            <Radio value="option2" label="Value2" />
          </RadioGroup>
        </MainSection>
      </GridWrapper>

      <Footer
        backTo="/checkbox"
        backToTitle="Checkbox"
        nextTo="/input-field"
        nextToTitle="Input Field"
        title="Radio Button"
      />
    </>
  );
}
