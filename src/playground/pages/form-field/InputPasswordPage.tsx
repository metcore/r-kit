import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import { useMarkdown } from '../../hooks/useMarkdown';
import { Card, CardBody } from '../../../components/card';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import dedent from 'dedent';
import HeroSection from '../../components/HeroSection';
import GridWrapper from '../../components/GridWrapper';
import Footer from '../../components/Footer';
import { InputPassword } from '../../../components/input/input-password';

export default function InputPasswordPage() {
  const { doc } = useMarkdown(`/docs/input-field.md`);

  const exampleBasic = dedent(`
    import { InputPassword } from '@herca/r-kit/input-password';

    export default function Example() {
      return <InputPassword />;
    }
  `);

  const exampleControlled = dedent(`
    import { useState } from 'react';
    import { InputPassword } from '@herca/r-kit/input-password';

    export default function Example() {
      const [password, setPassword] = useState('');

      return (
        <InputPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      );
    }
  `);

  const examplePlaceholder = dedent(`
    import { InputPassword } from '@herca/r-kit/input-password';

    export default function Example() {
      return (
        <InputPassword
          placeholder="Enter password"
        />
      );
    }
  `);

  const exampleLabel = dedent(`
    import { InputPassword } from '@herca/r-kit/input-password';

    export default function Example() {
      return (
        <InputPassword
          label="Password"
        />
      );
    }
  `);

  const exampleHint = dedent(`
    import { InputPassword } from '@herca/r-kit/input-password';

    export default function Example() {
      return (
        <InputPassword
          label="Password"
          hint="Use at least 8 characters."
        />
      );
    }
  `);

  const exampleRequired = dedent(`
    import { InputPassword } from '@herca/r-kit/input-password';

    export default function Example() {
      return (
        <InputPassword
          label="Password"
          required
          hint="This field is required."
        />
      );
    }
  `);

  const exampleDisabled = dedent(`
    import { InputPassword } from '@herca/r-kit/input-password';

    export default function Example() {
      return (
        <InputPassword
          label="Password"
          disabled
          value="secret-password"
        />
      );
    }
  `);

  const exampleInvalid = dedent(`
    import { InputPassword } from '@herca/r-kit/input-password';

    export default function Example() {
      return (
        <InputPassword
          label="Password"
          errorMessages="This field is required."
        />
      );
    }
  `);

  const exampleTooltip = dedent(`
    import { InputPassword } from '@herca/r-kit/input-password';

    export default function Example() {
      return (
        <InputPassword
          label="Password"
          tooltip="Use a strong password."
        />
      );
    }
  `);

  const exampleSizes = dedent(`
    import { InputPassword } from '@herca/r-kit/input-password';

    export default function Example() {
      return (
        <>
          <InputPassword
            label="Small"
            size="sm"
          />

          <InputPassword
            label="Medium"
            size="md"
          />

          <InputPassword
            label="Large"
            size="lg"
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
        subtitle="Input Password"
        description="Komponen input khusus untuk memasukkan password dengan fitur keamanan dan visibility toggle."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection
            title="Basic Input Password"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPassword />
          </MainSection>

          <MainSection
            title="Controlled Input Password"
            className="flex-1"
            code={exampleControlled}
          >
            <InputPassword />
          </MainSection>

          <MainSection
            title="Placeholder Input Password"
            className="flex-1"
            code={examplePlaceholder}
          >
            <InputPassword placeholder="Enter password" />
          </MainSection>

          <MainSection
            title="Label Input Password"
            className="flex-1"
            code={exampleLabel}
          >
            <InputPassword label="Password" />
          </MainSection>

          <MainSection
            title="Hint Input Password"
            className="flex-1"
            code={exampleHint}
          >
            <InputPassword label="Password" hint="Use at least 8 characters." />
          </MainSection>

          <MainSection
            title="Required Input Password"
            className="flex-1"
            code={exampleRequired}
          >
            <InputPassword
              label="Password"
              required
              hint="This field is required."
            />
          </MainSection>

          <MainSection
            title="Disabled Input Password"
            className="flex-1"
            code={exampleDisabled}
          >
            <InputPassword label="Password" disabled value="secret-password" />
          </MainSection>

          <MainSection
            title="Invalid Input Password"
            className="flex-1"
            code={exampleInvalid}
          >
            <InputPassword
              label="Password"
              errorMessages="This field is required."
            />
          </MainSection>

          <MainSection
            title="Tooltip Input Password"
            className="flex-1"
            code={exampleTooltip}
          >
            <InputPassword label="Password" tooltip="Use a strong password." />
          </MainSection>

          <MainSection
            title="Size Input Password"
            className="flex-1"
            code={exampleSizes}
          >
            <InputPassword label="Small" size="sm" />
            <InputPassword label="Medium" size="md" />
            <InputPassword label="Large" size="lg" />
          </MainSection>
        </GridWrapper>

        <Card>
          <CardBody>
            <MarkdownRenderer content={doc?.content ?? ''} />
          </CardBody>
        </Card>

        <Footer
          backTo="/checkbox"
          backToTitle="Checkbox"
          nextTo="/input-group"
          title="Input Password"
          nextToTitle="Input Group"
        />
      </div>
    </>
  );
}
