import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import {
  InputFile,
  type FileItem,
  type InputFileRef,
  type InputFileValue,
  type UploadFileValueInput,
  type UploadedFileValue,
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

  // InputFileValue[]: menampung entry remote (dari server) maupun FileItem hasil onChange.
  const [files, setFiles] = useState<InputFileValue[]>([
    {
      id: 1,
      url: 'https://stg.cdn.herca.id//test//OFjI62VmGggcHMB13vCnjUTHafweMhcq5oTzLb5R.png',
      name: 'a.png',
      type: 'png',
    },
  ]);

  // Lazy initializer: createMockFile mengalokasikan Blob 1.2 MB, jangan dijalankan tiap render.
  const [defaultFiles, setDefaultFiles] = useState<FileItem[]>(() => [
    createMockFile({
      id: 'mock-example-photo',
      name: 'example-photo.jpg',
      type: 'image/jpeg',
      hint: 'Uploading...',
      sizeMb: 1.2,
    }),
  ]);

  const [serverFiles, setServerFiles] = useState<UploadedFileValue[]>([]);

  // Meniru form edit: value-nya baru datang setelah data detail selesai
  // di-fetch, bukan sudah final sejak mount.
  const [lateFiles, setLateFiles] = useState<UploadFileValueInput[]>([]);

  const [existingFiles, setExistingFiles] = useState<UploadFileValueInput[]>([
    {
      id: 1,
      url: 'https://stg.cdn.herca.id//test//OFjI62VmGggcHMB13vCnjUTHafweMhcq5oTzLb5R.png',
      original_name: 'tanda-tangan.png',
      size: 182,
    },
    {
      id: 2,
      url: 'https://stg.cdn.herca.id//test//OFjI62VmGggcHMB13vCnjUTHafweMhcq5oTzLb5R.png',
      original_name: 'lampiran-sedang.png',
      size: 348160,
    },
    {
      id: 3,
      url: 'https://stg.cdn.herca.id//test//OFjI62VmGggcHMB13vCnjUTHafweMhcq5oTzLb5R.png',
      original_name: 'tanpa-ukuran.png',
    },
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
    // mode="uploadFile" mengunggah berkas segera setelah dipilih, lengkap
    // dengan indikator progres per berkas. Nilainya berupa
    // { id, url, original_name } — saat multiple, semua berkas ikut masuk,
    // bukan cuma yang unggahannya selesai duluan.
    const [files, setFiles] = useState<UploadedFileValue[]>([]);

    <InputFile
      mode="uploadFile"
      multiple
      accept=".png"
      variant="medium"
      value={files}
      onChange={setFiles}
      uploadConfig={{ url: '/api/upload', fieldName: 'file' }}
    />
  `);

  const exampleExistingSize = dedent(`
    // Ukuran berkas yang sudah tersimpan di server tidak pernah diukur
    // sendiri oleh komponen — tidak ada permintaan HEAD/Content-Length.
    // Isi \`size\` dalam byte supaya ukurannya ikut tampil; entry tanpa
    // \`size\` hanya menampilkan namanya saja.
    const [files, setFiles] = useState<UploadFileValueInput[]>([
      { id: 1, url: '/berkas/tanda-tangan.png', original_name: 'tanda-tangan.png', size: 182 },
      { id: 2, url: '/berkas/lampiran.png', original_name: 'lampiran-sedang.png', size: 348160 },
      { id: 3, url: '/berkas/lain.png', original_name: 'tanpa-ukuran.png' },
    ]);

    <InputFile
      mode="uploadFile"
      multiple
      variant="medium"
      value={files}
      onChange={setFiles}
      uploadConfig={{ url: '/api/upload', fieldName: 'file' }}
    />
  `);

  const exampleLateValue = dedent(`
    // Form edit yang dirender sebelum data detail datang: value-nya awalnya
    // kosong, lalu terisi lewat reset(). Id lampiran lama harus tetap utuh
    // sesudahnya — kalau jadi null, backend menyimpannya sebagai file baru.
    const [files, setFiles] = useState<UploadFileValueInput[]>([]);

    useEffect(() => {
      if (!detail) return;
      reset({ attachments: detail.attachments });
    }, [detail, reset]);

    <InputFile
      mode="uploadFile"
      multiple
      variant="medium"
      value={files}
      onChange={setFiles}
      uploadConfig={{ url: '/api/upload', fieldName: 'file' }}
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

      <form onSubmit={(e) => e.preventDefault()}>
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
              onChange={setFiles}
              errorMessage="Upload file terlebih dahulu sebelum melanjutkan"
            />
          </MainSection>
          <MainSection
            title="Input File Medium With Input Field"
            code={exampleCustomName}
          >
            <InputFile
              ref={fileRef}
              allowCustomName
              variant="medium"
              value={defaultFiles}
              onChange={setDefaultFiles}
              accept="*"
            />
          </MainSection>
          <MainSection
            title="Input File Large With Input Field"
            code={exampleCustomName}
          >
            <InputFile
              allowCustomName
              variant="large"
              value={defaultFiles}
              onChange={setDefaultFiles}
              selectedFilesClassName="[&>div:last-child]:max-h-[100px] [&>div:last-child]:overflow-scroll"
            />
          </MainSection>
          <MainSection title="Input File Mode Server" code={exampleServer}>
            <InputFile
              mode="uploadFile"
              multiple
              accept=".png"
              variant="medium"
              value={serverFiles}
              onChange={setServerFiles}
              uploadConfig={{
                url: 'https://httpbin.org/post',
                fieldName: 'file',
              }}
              onUploadSuccess={(results) => {
                console.log(results);
              }}
            />
          </MainSection>
          <MainSection
            title="Ukuran Berkas yang Sudah Ada"
            code={exampleExistingSize}
          >
            <InputFile
              mode="uploadFile"
              multiple
              variant="medium"
              label="Berkas tersimpan"
              hint="182 B, 340 KB, dan satu entry tanpa size"
              value={existingFiles}
              onChange={(files) => setExistingFiles(files)}
              uploadConfig={{
                url: 'https://httpbin.org/post',
                fieldName: 'file',
              }}
            />
          </MainSection>
          <MainSection
            title="Value yang Datang Belakangan"
            code={exampleLateValue}
          >
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="w-fit cursor-pointer rounded-lg border border-gray-200 px-3 py-2"
                onClick={() =>
                  setLateFiles([
                    {
                      id: 42,
                      url: 'https://stg.cdn.herca.id//test//OFjI62VmGggcHMB13vCnjUTHafweMhcq5oTzLb5R.png',
                      original_name: 'surat-resmi-lama.png',
                      size: 182,
                    },
                  ])
                }
              >
                Muat data detail (reset)
              </button>
              <InputFile
                mode="uploadFile"
                multiple
                variant="medium"
                label="Lampiran surat resmi"
                hint="Id 42 harus tetap 42 setelah data detail dimuat"
                value={lateFiles}
                onChange={(files) => setLateFiles(files)}
                uploadConfig={{
                  url: 'https://httpbin.org/post',
                  fieldName: 'file',
                }}
              />
              <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 text-xs">
                {JSON.stringify(lateFiles, null, 2)}
              </pre>
            </div>
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
                allowCustomName
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
                allowCustomName
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
