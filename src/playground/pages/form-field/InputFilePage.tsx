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

  const exampleMedium = dedent(`
    // variant="medium" menampilkan area unggah berukuran sedang.
    <InputFile variant="medium" value={files} onChange={setFiles} accept="*" />
  `);

  const exampleValidasi = dedent(`
    // errorMessage memberi tanda merah beserta pesannya.
    <InputFile
      variant="medium"
      value={files}
      onChange={setFiles}
      errorMessage="Upload file terlebih dahulu sebelum melanjutkan"
    />
  `);

  const exampleLarge = dedent(`
    // variant="large" memberi area seret-dan-lepas yang lebih lapang.
    <InputFile variant="large" value={files} onChange={setFiles} />
  `);

  const exampleCustomName = dedent(`
    // useCustomName menambahkan kolom teks di tiap berkas,
    // sehingga user bisa memberi nama tampilan sendiri.
    <InputFile
      useCustomName
      variant="medium"
      value={files}
      onChange={setFiles}
    />
  `);

  const exampleServer = dedent(`
    // uploadConfig mengunggah berkas segera setelah dipilih,
    // lengkap dengan indikator progres per berkas.
    <InputFile
      accept=".png"
      variant="medium"
      uploadConfig={{ url: '/api/upload', fieldName: 'file' }}
      onUploadSuccess={(results) => simpan(results)}
    />
  `);

  const exampleHooks = dedent(`
    import { useInputFile, InputFilePreview } from '@herca/r-kit/clients';

    // useInputFile memisahkan kendali berkas dari tampilannya,
    // sehingga area unggah dan daftar pratinjau bisa diletakkan terpisah.
    const fileInput = useInputFile({
      accept: 'image/*,.pdf',
      maxSize: 5 * 1024 * 1024,
    });

    <InputFile inputFile={fileInput} label="Upload dokumen" multiple />
    <InputFilePreview inputFile={fileInput} mode="compact" />
  `);

  const exampleButtonVariant = dedent(`
    // buttonVariant mengganti gaya tombol pilih berkas.
    <InputFile inputFile={fileInput} buttonVariant="outline" variant="large" />
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
          <MainSection title="Input File Medium" code={exampleMedium}>
            <InputFile
              variant="medium"
              value={files}
              onChange={setFiles}
              accept="*"
            />
          </MainSection>
          <MainSection
            title="Input File Medium Validasi"
            code={exampleValidasi}
          >
            <InputFile
              variant="medium"
              value={files}
              onChange={setFiles}
              accept="*"
              errorMessage="Upload file terlebih dahulu sebelum melanjutkan"
            />
          </MainSection>
          <MainSection title="Input File Large" code={exampleLarge}>
            <InputFile variant="large" value={files} onChange={setFiles} />
          </MainSection>
          <MainSection
            title="Input File Large With Validasi"
            code={exampleValidasi}
          >
            <InputFile
              variant="large"
              value={files}
              onChange={setDefaultFiles}
              errorMessage="Upload file terlebih dahulu sebelum melanjutkan"
            />
          </MainSection>
          <MainSection
            title="Input File Medium With Input Field"
            code={exampleCustomName}
          >
            <InputFile
              ref={fileRef}
              useCustomName
              variant="medium"
              value={defaultFiles}
              onChange={setFiles}
              accept="*"
            />
          </MainSection>
          <MainSection
            title="Input File Large With Input Field"
            code={exampleCustomName}
          >
            <InputFile
              ref={fileRef}
              useCustomName
              variant="large"
              value={defaultFiles}
              onChange={setDefaultFiles}
              selectedFilesClassName="[&>div:last-child]:max-h-[100px] [&>div:last-child]:overflow-scroll"
            />
          </MainSection>
          <MainSection title="Input File Mode Server" code={exampleServer}>
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
          <MainSection title="Menggunakan Hooks" code={exampleHooks}>
            <div className="flex flex-col gap-6">
              <InputFile
                inputFile={fileInput}
                label="Upload dokumen"
                multiple
              />
              <InputFilePreview inputFile={fileInput} mode="compact" />
            </div>
          </MainSection>
          <MainSection title="Large Menggunakan Hooks" code={exampleHooks}>
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
          <MainSection
            title="Color & Variant Button"
            code={exampleButtonVariant}
          >
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
        title="Input File"
        backTo="/playground/counter"
        backToTitle="Counter"
        nextTo="/playground/date-picker"
        nextToTitle="Date Picker"
      />
    </>
  );
}
