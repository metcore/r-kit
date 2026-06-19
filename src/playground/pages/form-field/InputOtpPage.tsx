import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import { useMarkdown } from '../../hooks/useMarkdown';
import { Card, CardBody } from '../../../components/card';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import dedent from 'dedent';
import HeroSection from '../../components/HeroSection';
import GridWrapper from '../../components/GridWrapper';
import Footer from '../../components/Footer';
import { InputOTP } from '../../../clients';

export default function InputOtpPage() {
  const { doc } = useMarkdown(`/docs/input-field.md`);

  const exampleBasic = dedent(`
    import { InputOTP } from '@your-library/components';

    export default function Example() {
      return <InputOTP />;
    }
  `);

  const exampleControlled = dedent(`
    import { useState } from 'react';
    import { InputOTP } from '@your-library/components';

    export default function Example() {
      const [otp, setOtp] = useState('');

      return (
        <InputOTP
          value={otp}
          onChange={setOtp}
        />
      );
    }
  `);

  const exampleLength = dedent(`
    import { InputOTP } from '@your-library/components';

    export default function Example() {
      return (
        <InputOTP
          length={6}
        />
      );
    }
  `);

  const exampleMask = dedent(`
    import { InputOTP } from '@your-library/components';

    export default function Example() {
      return (
        <InputOTP
          mask={true}
          length={6}
        />
      );
    }
  `);

  const exampleUnmask = dedent(`
    import { InputOTP } from '@your-library/components';

    export default function Example() {
      return (
        <InputOTP
          mask={false}
          length={6}
        />
      );
    }
  `);

  const exampleLabel = dedent(`
    import { InputOTP } from '@your-library/components';

    export default function Example() {
      return (
        <InputOTP
          label="Verification Code"
          length={6}
        />
      );
    }
  `);

  const exampleHint = dedent(`
    import { InputOTP } from '@your-library/components';

    export default function Example() {
      return (
        <InputOTP
          label="Verification Code"
          hint="Enter the code sent to your phone."
          length={6}
        />
      );
    }
  `);

  const exampleRequired = dedent(`
    import { InputOTP } from '@your-library/components';

    export default function Example() {
      return (
        <InputOTP
          label="Verification Code"
          required
          length={6}
        />
      );
    }
  `);

  const exampleDisabled = dedent(`
    import { InputOTP } from '@your-library/components';

    export default function Example() {
      return (
        <InputOTP
          disabled
          length={6}
        />
      );
    }
  `);

  const exampleInvalid = dedent(`
    import { InputOTP } from '@your-library/components';

    export default function Example() {
      return (
        <InputOTP
          errorMessages="OTP code is invalid."
          length={6}
        />
      );
    }
  `);

  const exampleSizes = dedent(`
    import { InputOTP } from '@your-library/components';

    export default function Example() {
      return (
        <>
          <InputOTP
            size="sm"
            length={4}
          />

          <InputOTP
            size="md"
            length={4}
          />

          <InputOTP
            size="lg"
            length={4}
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
        subtitle="Input OTP"
        description="Komponen input khusus untuk memasukkan OTP atau verification code dengan multiple input fields."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection
            title="Basic Input OTP"
            className="flex-1"
            code={exampleBasic}
          >
            <InputOTP value="123456" onChange={(e) => console.log(e)} />
          </MainSection>

          <MainSection
            title="Label Input OTP && Required"
            className="flex-1"
            code={exampleLabel}
          >
            <InputOTP required label="Verification Code" length={6} />
          </MainSection>

          <MainSection
            title="Label Input Hint & tooltip"
            className="flex-1"
            code={exampleLabel}
          >
            <InputOTP required label="Verification Code" length={6} />
          </MainSection>

          <MainSection
            title="Controlled Input OTP"
            className="flex-1"
            code={exampleControlled}
          >
            <InputOTP />
          </MainSection>

          <MainSection
            title="Custom Length Input OTP"
            className="flex-1"
            code={exampleLength}
          >
            <InputOTP length={6} />
          </MainSection>

          <MainSection
            title="Masked Input OTP"
            className="flex-1"
            code={exampleMask}
          >
            <InputOTP mask={true} length={6} />
          </MainSection>

          <MainSection
            title="Unmasked Input OTP"
            className="flex-1"
            code={exampleUnmask}
          >
            <InputOTP mask={false} length={6} />
          </MainSection>

          <MainSection
            title="Hint Input OTP"
            className="flex-1"
            code={exampleHint}
          >
            <InputOTP
              label="Verification Code"
              hint="Enter the code sent to your phone."
              length={6}
            />
          </MainSection>

          <MainSection
            title="Required Input OTP"
            className="flex-1"
            code={exampleRequired}
          >
            <InputOTP label="Verification Code" required length={6} />
          </MainSection>

          <MainSection
            title="Disabled Input OTP"
            className="flex-1"
            code={exampleDisabled}
          >
            <InputOTP disabled length={6} />
          </MainSection>

          <MainSection
            title="Invalid Input OTP"
            className="flex-1"
            code={exampleInvalid}
          >
            <InputOTP errorMessages="OTP code is invalid." length={6} />
          </MainSection>

          <MainSection
            title="Size Input OTP"
            className="flex-1"
            code={exampleSizes}
          >
            <InputOTP size="sm" length={4} />
            <InputOTP size="md" length={4} />
            <InputOTP size="lg" length={4} />
          </MainSection>
        </GridWrapper>

        <Card>
          <CardBody>
            <MarkdownRenderer content={doc?.content ?? ''} />
          </CardBody>
        </Card>

        <Footer
          backTo="/input-password"
          backToTitle="Input Password"
          nextTo="/input-group"
          title="Input OTP"
          nextToTitle="Input Group"
        />
      </div>
    </>
  );
}
