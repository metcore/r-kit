import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import {
  InputFile,
  type FileItem,
  type InputFileRef,
} from '../../../components/input-file';
import { useRef, useState } from 'react';
import { createMockFile } from '../../../components/input-file/helpers';
import dedent from 'dedent';
import HeroSection from '../../components/HeroSection';
import GridWrapper from '../../components/GridWrapper';
import Footer from '../../components/Footer';
import { InputFilePreview } from '../../../components/input-file/input-file-preview';
import { useInputFile } from '../../../components/input-file/use-input-file';

export default function InputFilePage() {
  const fileRef = useRef<InputFileRef>(null);

  const [files, setFiles] = useState<FileItem[]>([]);
  const [defaultFiles, setDefaultFiles] = useState<FileItem[]>([
    createMockFile({
      name: 'example-photo.jpg',
      type: 'image/jpeg',
      hint: 'Uploading...',
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

  const fileInput = useInputFile({
    accept: 'image/*,.pdf',
    maxSize: 5 * 1024 * 1024,
    // uploadConfig: {
    //   url: 'https://httpbin.org/post',
    //   fieldName: 'file',
    // },
  });
  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Input File"
        description="Field yang memungkinkan user mengunggah file dari perangkat mereka."
      />

      <form onSubmit={() => console.log('jir')}>
        <GridWrapper>
          <MainSection
            title="Basic Input File"
            contentClassName="grid grid-cols-3 gap-5 "
            code={basicInput}
          >
            <InputFile
              value={files}
              onChange={setFiles}
              accept="image/*,.pdf"
            />
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
              selectedFilesClassName="[&>div:last-child]:max-h-[100px] [&>div:last-child]:overflow-scroll"
            />
          </MainSection>
          <MainSection title="Input File Mode Server">
            <InputFile
              accept=".png"
              variant="medium"
              uploadConfig={{
                url: 'https://httpbin.org/post',
                fieldName: 'file',
              }}
              onUploadSuccess={(results) => console.log(results)}
            />
          </MainSection>
          <MainSection title="Menggunakan Hooks">
            <div className="flex flex-col gap-6">
              <InputFile
                inputFile={fileInput}
                label="Upload dokumen"
                multiple
              />
              <InputFilePreview inputFile={fileInput} mode="compact" />
            </div>
          </MainSection>
          <MainSection title="Large Menggunakan Hooks">
            <div className="flex flex-col gap-6">
              <InputFile
                inputFile={fileInput}
                useCustomName
                variant="large"
                selectedFilesClassName="[&>div:last-child]:max-h-[100px] [&>div:last-child]:overflow-scroll"
              />
              <InputFilePreview inputFile={fileInput} mode="compact" />
            </div>
          </MainSection>
          <MainSection title="Color & Variant Button">
            <div className="flex flex-col gap-6">
              <InputFile
                inputFile={fileInput}
                useCustomName
                buttonVariant="outline"
                variant="large"
                selectedFilesClassName="[&>div:last-child]:max-h-[100px] [&>div:last-child]:overflow-scroll"
              />
              <InputFilePreview inputFile={fileInput} mode="compact" />
            </div>
          </MainSection>
        </GridWrapper>
      </form>

      <Footer
        nextTo="/date-picker"
        title="Input File"
        nextToTitle="Date Picker"
        backTo="/counter"
        backToTitle="Counter"
      />
    </>
  );
}
