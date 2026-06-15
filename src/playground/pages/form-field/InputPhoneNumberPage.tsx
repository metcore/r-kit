import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import { useMarkdown } from '../../hooks/useMarkdown';
import { Card, CardBody } from '../../../components/card';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import dedent from 'dedent';
import HeroSection from '../../components/HeroSection';
import GridWrapper from '../../components/GridWrapper';
import Footer from '../../components/Footer';
import {
  InputPhoneNumber,
  type PhoneNumberValue,
} from '../../../components/input/input-phone-number';
import { useState } from 'react';

export default function InputPasswordPage() {
  const { doc } = useMarkdown(`/docs/input-field.md`);
  const [value, setValue] = useState<PhoneNumberValue>();

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
            title="Basic Input Phone Number"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPhoneNumber
              placeholder="Please fill phone number"
              onChange={setValue}
              value={value}
            />
          </MainSection>
          <MainSection
            title="Label Input Phone Number"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPhoneNumber
              label="Label"
              value={{
                dialCode: '',
                value: '8960403339',
              }}
            />
          </MainSection>
          <MainSection
            title="Hint Input Phone Number"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPhoneNumber
              label="Label"
              hint="Use at least 8 characters, including uppercase letters, numbers, and special characters."
            />
          </MainSection>
          <MainSection
            title="Required Input Phone Number"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPhoneNumber
              label="Label"
              hint="Use at least 8 characters, including uppercase letters, numbers, and special characters."
              required
            />
          </MainSection>
          <MainSection
            title="Disabled Input Phone Number"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPhoneNumber
              label="Label"
              hint="Use at least 8 characters, including uppercase letters, numbers, and special characters."
              required
              disabled
            />
          </MainSection>
          <MainSection
            title="Invalid Input Phone Number"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPhoneNumber
              label="Label"
              hint="Use at least 8 characters, including uppercase letters, numbers, and special characters."
              errorMessages="This field is required."
              required
            />
          </MainSection>
          <MainSection
            title="Tooltip Input Phone Number"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPhoneNumber
              label="Label"
              hint="Use at least 8 characters, including uppercase letters, numbers, and special characters."
              errorMessages="This field is required."
              tooltip="Please fill input number"
              required
            />
          </MainSection>
          <MainSection
            title="Size Input Phone Number"
            className="flex-1"
            code={exampleBasic}
          >
            <InputPhoneNumber label="Small" size="sm" required />
            <InputPhoneNumber label="Medium" size="md" required />
            <InputPhoneNumber label="Large" size="lg" required />
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
