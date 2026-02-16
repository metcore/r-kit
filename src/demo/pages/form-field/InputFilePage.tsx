import HeroSection from "../../components/HeroSection";
import DashboardLayout from "../../layouts/DashboardLayout";
import illust from "../../assets/images/forms.png";
import GridWrapper from "../../components/GridWrapper";
import MainSection from "../../components/MainSection";
import {
  InputFile,
  type FileItem,
  type InputFileRef,
} from "../../../components/input-file";
import { useRef, useState } from "react";
import { createMockFile } from "../../../components/input-file/helpers";
import Footer from "../../components/Footer";
import dedent from "dedent";

export default function InputFilePage() {
  const fileRef = useRef<InputFileRef>(null);

  const [files, setFiles] = useState<FileItem[]>([]);
  const [defaultFiles, setDefaultFiles] = useState<FileItem[]>([
    createMockFile({
      name: "example-photo.jpg",
      type: "image/jpeg",
      sizeMb: 1.2,
    }),
  ]);

  const basicInput = dedent(`
    <div className="flex gap-4">
      <InputFile value={files} onChange={setFiles}  />
      <InputFile variant="secondary" value={files} onChange={setFiles} />
      <InputFile variant="gray" value={files} onChange={setFiles} />
    </div>
  `);

  const multipleSelect = dedent(`
    const [files, setFiles] = useState<FileItem[]>([]);

    <InputFile
      multiple
      value={files}
      onChange={setFiles}
    />
  `);

  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Input File"
        description="Field yang memungkinkan user mengunggah file dari perangkat mereka."
      />

      <GridWrapper>
        <MainSection
          title="Basic Input File"
          contentClassName="grid grid-cols-3 gap-5"
          code={basicInput}
        >
          <InputFile value={files} onChange={setFiles} accept="image/*,.pdf" />
          <InputFile
            variant="secondary"
            value={files}
            onChange={setFiles}
            accept="image/*,.pdf"
          />
          <InputFile
            variant="gray"
            value={files}
            onChange={setFiles}
            accept="image/*,.pdf"
          />
        </MainSection>

        <MainSection title="Multiple Select" code={multipleSelect}>
          <InputFile multiple value={files} onChange={setFiles} />
        </MainSection>

        <MainSection title="Input File Medium">
          <InputFile
            variant="medium"
            value={files}
            onChange={setFiles}
            accept="*"
          />
        </MainSection>

        <MainSection title="Input File Medium Validasi">
          <InputFile
            variant="medium"
            value={files}
            onChange={setFiles}
            accept="*"
            errorMessage="Upload file terlebih dahulu sebelum melanjutkan"
          />
        </MainSection>
        <MainSection title="Input File Large">
          <InputFile variant="large" value={files} onChange={setFiles} />
        </MainSection>
        <MainSection title="Input File Large With Validasi">
          <InputFile
            variant="large"
            value={files}
            onChange={setDefaultFiles}
            errorMessage="Upload file terlebih dahulu sebelum melanjutkan"
          />
        </MainSection>

        <MainSection title="Input File Medium With Input Field">
          <InputFile
            ref={fileRef}
            useCustomName
            variant="medium"
            value={defaultFiles}
            onChange={setFiles}
            accept="*"
          />
        </MainSection>
        <MainSection title="Input File Large With Input Field">
          <InputFile
            ref={fileRef}
            useCustomName
            variant="large"
            value={defaultFiles}
            onChange={setDefaultFiles}
          />
        </MainSection>
      </GridWrapper>

      <Footer
        nextTo="/date-picker"
        title="Input File"
        nextToTitle="Date Picker"
        backTo="/counter"
        backToTitle="Counter"
      />
    </DashboardLayout>
  );
}
