import HeroSection from "../components/HeroSection";
import DashboardLayout from "../layouts/DashboardLayout";
import illust from "../assets/images/forms.png";
import GridWrapper from "../components/GridWrapper";
import MainSection from "../components/MainSection";
import { Input } from "../../components/input";
import { useState } from "react";
import { Icon } from "../../components/icons";
import { InputOTP } from "../../components/input-otp";
import Footer from "../components/Footer";
import { useMarkdown } from "../hooks/useMarkdown";
import { Card, CardBody } from "../../components/card";
import MarkdownRenderer from "../components/MarkdownRenderer";
import dedent from "dedent";

export default function InputFieldPage() {
  const { doc } = useMarkdown(`/docs/input-field.md`);
  const [filledInput, setFilledInput] = useState("Maman_alkatiri23");
  const [otp, setOtp] = useState("");

  const exampleBasic = dedent(`
    <Input />
  `);

  const exampleLabelText = dedent(`
    <div className="grid grid-cols-3 gap-8">
      <Input label="Default Input" placeholder="Username" />
      <Input label="Input Aktif" autoFocus value={"Maman_"} />
      <Input
        label="Filled Input"
        value={filledInput}
        onChange={(e) => setFilledInput(e.target.value)}
      />
    </div>
  `);

  const exampleHelperText = dedent(`
    <Input
      label="Username"
      placeholder="Username"
      hint="This is hint text"
    />
  `);

  const exampleSize = dedent(`
    <div className="grid grid-cols-3 gap-8">
      <Input size="sm" placeholder="Input small" />
      <Input size="md" placeholder="input medium" />
      <Input size="lg" placeholder="Input large" />
    </div>
  `);

  const exampleDisabled = dedent(`
    <Input placeholder="Username" disabled />
  `);

  const exampleInvalid = dedent(`
    <Input
      placeholder="Username"
      errorMessages={"Username is required"}
      rightAddon={
        <Icon name="info-circle-fill" className="text-danger-500" />
      }
    />
  `);

  const exampleOtp = dedent(`
    <InputOTP
      value={otp}
      onChange={setOtp}
      hint="This is description"
      size="lg"
    />
  `);

  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Input Field"
        description="Memungkinkan user memasukkan teks, baik untuk entri pendek maupun panjang."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection
            title="Basic Input Text"
            className="flex-1"
            code={exampleBasic}
          >
            <Input />
          </MainSection>
          <MainSection
            title="Label Text"
            className="flex-1"
            code={exampleLabelText}
          >
            <div className="grid grid-cols-3 gap-8">
              <Input label="Default Input" placeholder="Username" />
              <Input label="Input Aktif" autoFocus value={"Maman_"} />
              <Input
                label="Filled Input"
                value={filledInput}
                onChange={(e) => setFilledInput(e.target.value)}
              />
            </div>
          </MainSection>
        </GridWrapper>
        <GridWrapper>
          <MainSection
            title="Helper Text"
            className="flex-1"
            code={exampleHelperText}
          >
            <Input
              label="Username"
              placeholder="Username"
              hint="This is helper text"
            />
          </MainSection>
          <MainSection title="Input Size" className="flex-1" code={exampleSize}>
            <div className="grid grid-cols-3 gap-8">
              <Input size="sm" placeholder="Input small" />
              <Input size="md" placeholder="input medium" />
              <Input size="lg" placeholder="Input large" />
            </div>
          </MainSection>
        </GridWrapper>
        <GridWrapper>
          <MainSection
            title="Disabled"
            className="flex-1"
            code={exampleDisabled}
          >
            <Input placeholder="Username" disabled />
          </MainSection>
          <MainSection
            title="Error / Invalid"
            className="flex-1"
            code={exampleInvalid}
          >
            <Input
              placeholder="Username"
              errorMessages={"Username is required"}
              rightAddon={
                <Icon name="info-circle-fill" className="text-danger-500" />
              }
            />
          </MainSection>
        </GridWrapper>
        <MainSection title="Input OTP" code={exampleOtp}>
          <InputOTP
            value={otp}
            onChange={setOtp}
            hint="This is description"
            size="lg"
          />
        </MainSection>

        <Card>
          <CardBody>
            <MarkdownRenderer content={doc?.content || ""} />
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
    </DashboardLayout>
  );
}
