import { useRef, useState } from 'react';
import dedent from 'dedent';
import illust from '../../../assets/images/forms.png';
import { Button, TextEditor, type TextEditorRef } from '../../../clients';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';

export default function TextEditorPage() {
  const [defaultValue, setDefaultValue] = useState('');
  const [advanceValue, setAdvanceValue] = useState('');
  const [uploadValue, setUploadValue] = useState('');
  const [validasiValue, setValidasiValue] = useState('');
  const [sizeValue, setSizeValue] = useState('');
  const [disabledValue, setDisabledValue] = useState(
    '<p>Konten ini tidak bisa diedit.</p>'
  );
  const [variableValue, setVariableValue] = useState('');

  const editorRef = useRef<TextEditorRef>(null);

  const variables = [
    { label: 'nama_pelanggan', value: 'customer_name' },
    { label: 'nomor_invoice', value: 'invoice_number' },
    { label: 'total_tagihan', value: 'total_amount' },
  ];

  const defaultExample = dedent(`
    <TextEditor
      label="Description"
      value={value}
      onChange={(v) => setValue(v.getHTML())}
    />
  `);

  const advanceExample = dedent(`
    <TextEditor
      label="Description"
      value={value}
      onChange={(v) => setValue(v.getHTML())}
      plugins={{
        showToolbar: {
          advance: true,
        },
      }}
    />
  `);

  const uploadExample = dedent(`
    <TextEditor
      label="Description"
      value={value}
      onChange={(v) => setValue(v.getHTML())}
      plugins={{
        showToolbar: {
          advance: true,
        },
        inputFile: {
          upload: {
            label: 'label',
            hint: 'hint',
            config: {
              url: 'https://stg.media.herca.id/api/upload',
              headers: {
                accept: 'application/json',
                'X-API-KEY': '19ee5d65cf71b64e5ed168dbf4817e89bc9024b90c499557',
              },
              maxSize: 5,
            },
          },
        },
      }}
    />
  `);

  const validasiExample = dedent(`
    <TextEditor
      required
      label="Description"
      hint="hint"
      description="description"
      errorMessages={'error message'}
      value={value}
      onChange={(v) => setValue(v.getHTML())}
    />
  `);

  const sizeExample = dedent(`
    <div className="flex flex-col gap-4">
      <TextEditor
        label="Small (sm)"
        size="sm"
        value={value}
        onChange={(v) => setValue(v.getHTML())}
      />
      <TextEditor
        label="Medium (md)"
        size="md"
        value={value}
        onChange={(v) => setValue(v.getHTML())}
      />
      <TextEditor
        label="Large (lg)"
        size="lg"
        value={value}
        onChange={(v) => setValue(v.getHTML())}
      />
    </div>
  `);

  const variableExample = dedent(`
    const editorRef = useRef<TextEditorRef>(null);

    return (
      <div className="flex gap-4">
        <TextEditor
          ref={editorRef}
          label="Description"
          value={value}
          onChange={(v) => setValue(v.getHTML())}
        />

        {variables?.data?.map((variable) => (
          <Button
            key={variable.value}
            color="gray"
            variant="tertiary"
            className="w-full justify-start"
            // cegah editor kehilangan seleksi saat tombol ditekan
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.insertText(\`{{\${variable.label}}}\`)}
          >
            {\`{{\${variable.label}}}\`}
          </Button>
        ))}
      </div>
    );
  `);

  const disabledExample = dedent(`
    <TextEditor
      label="Description"
      disabled
      value={value}
      onChange={(v) => setValue(v.getHTML())}
    />
  `);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Text Editor"
        description="Komponen untuk membuat dan mengedit konten rich text dengan format, struktur, dan elemen tambahan di luar input teks biasa."
      />

      <div className="flex flex-col gap-8">
        <GridWrapper>
          <MainSection
            title="Text Editor"
            code={defaultExample}
            className="col-span-2"
          >
            <TextEditor
              label="Description"
              height={'fit-content'}
              value={defaultValue}
              onChange={(v) => setDefaultValue(v.getHTML())}
            />
          </MainSection>

          <MainSection
            title="Text Editor Advance Toolbar"
            code={advanceExample}
            className="col-span-2"
          >
            <TextEditor
              label="Description"
              value={advanceValue}
              onChange={(v) => setAdvanceValue(v.getHTML())}
              plugins={{
                showToolbar: {
                  advance: true,
                },
              }}
            />
          </MainSection>

          <MainSection
            title="Text Editor Upload Gambar"
            code={uploadExample}
            className="col-span-2"
          >
            <TextEditor
              label="Description"
              value={uploadValue}
              onChange={(v) => setUploadValue(v.getHTML())}
              plugins={{
                showToolbar: {
                  advance: true,
                },
                inputFile: {
                  upload: {
                    label: 'label',
                    hint: 'hint',
                    config: {
                      url: 'https://stg.media.herca.id/api/upload',
                      headers: {
                        accept: 'application/json', // prettier-ignore
                        'X-API-KEY': '19ee5d65cf71b64e5ed168dbf4817e89bc9024b90c499557', //prettier-ignore
                      },
                      maxSize: 5,
                    },
                  },
                },
              }}
            />
          </MainSection>

          <MainSection
            title="Text Editor Validasi"
            code={validasiExample}
            className="col-span-2"
          >
            <TextEditor
              required
              label="Description"
              hint="hint"
              description="description"
              errorMessages={'error message'}
              value={validasiValue}
              onChange={(v) => setValidasiValue(v.getHTML())}
            />
          </MainSection>

          <MainSection
            title="Text Editor Size"
            code={sizeExample}
            className="col-span-2"
          >
            <div className="flex flex-col gap-4">
              <TextEditor
                label="Small (sm)"
                size="sm"
                value={sizeValue}
                onChange={(v) => setSizeValue(v.getHTML())}
              />
              <TextEditor
                label="Medium (md)"
                size="md"
                value={sizeValue}
                onChange={(v) => setSizeValue(v.getHTML())}
              />
              <TextEditor
                label="Large (lg)"
                size="lg"
                value={sizeValue}
                onChange={(v) => setSizeValue(v.getHTML())}
              />
            </div>
          </MainSection>

          <MainSection
            title="Text Editor Insert Variable"
            code={variableExample}
            className="col-span-2"
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <TextEditor
                  ref={editorRef}
                  label="Description"
                  value={variableValue}
                  onChange={(v) => setVariableValue(v.getHTML())}
                />
              </div>

              <div className="flex w-56 shrink-0 flex-col gap-2">
                {variables.map((variable) => (
                  <Button
                    key={variable.value}
                    color="gray"
                    variant="tertiary"
                    className="w-full justify-start"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      editorRef.current?.insertText(`{{${variable.label}}}`)
                    }
                  >
                    {`{{${variable.label}}}`}
                  </Button>
                ))}
              </div>
            </div>
          </MainSection>

          <MainSection
            title="Text Editor Disabled"
            code={disabledExample}
            className="col-span-2"
          >
            <TextEditor
              disabled
              label="Description"
              value={disabledValue}
              onChange={(v) => setDisabledValue(v.getHTML())}
            />
          </MainSection>
        </GridWrapper>

        <Footer
          title="Text Editor"
          backTo="/playground/slider"
          backToTitle="Slider"
          nextTo="/playground/text-area"
          nextToTitle="Text Area"
        />
      </div>
    </>
  );
}
