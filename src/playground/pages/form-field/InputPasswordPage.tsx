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
    <Input />
  `);
  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Input Field"
        description="Memungkinkan user memasukkan teks, baik untuk entri pendek maupun panjang."
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
            title="Label Input Password"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPassword label="Label" />
          </MainSection>
          <MainSection
            title="Hint Input Password"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPassword
              label="Label"
              hint="Use at least 8 characters, including uppercase letters, numbers, and special characters."
            />
          </MainSection>
          <MainSection
            title="Required Input Password"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPassword
              label="Label"
              hint="Use at least 8 characters, including uppercase letters, numbers, and special characters."
              required
            />
          </MainSection>
          <MainSection
            title="Disabled Input Password"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPassword
              label="Label"
              hint="Use at least 8 characters, including uppercase letters, numbers, and special characters."
              required
              disabled
            />
          </MainSection>
          <MainSection
            title="Invalid Input Password"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPassword
              label="Label"
              hint="Use at least 8 characters, including uppercase letters, numbers, and special characters."
              errorMessages="This field is required."
              required
            />
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
          title="Input Field"
          nextToTitle="Input Group"
        />
      </div>
    </>
  );
}
