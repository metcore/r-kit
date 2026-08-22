import { useState } from 'react';
import dedent from 'dedent';
import illust from '../../../assets/images/forms.png';
import { Textarea } from '../../../components/textarea';
import { Text } from '../../../components/text';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';

export default function TextAreaPage() {
  const [clearableValue, setClearableValue] = useState(
    'Tombol clear muncul ketika textarea ada isinya.'
  );
  const [counterValue, setCounterValue] = useState('');
  const [clearedAt, setClearedAt] = useState<string | null>(null);

  const defaultExample = dedent(`
    <Textarea placeholder="Tulis sesuatu di sini..." />
  `);

  const labelExample = dedent(`
    <Textarea
      label="Deskripsi"
      description="Jelaskan kebutuhanmu sedetail mungkin."
      hint="Minimal 20 karakter."
      placeholder="Tulis deskripsi..."
    />
  `);

  const requiredExample = dedent(`
    <Textarea
      required
      label="Alasan Pengajuan"
      tooltip="Dipakai tim approval untuk meninjau pengajuanmu."
      placeholder="Tulis alasan pengajuan..."
    />
  `);

  const clearableExample = dedent(`
    const [value, setValue] = useState(
      'Tombol clear muncul ketika textarea ada isinya.'
    );

    <Textarea
      clearAble
      label="Catatan"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Tulis catatan..."
    />
  `);

  const clearCallbackExample = dedent(`
    <Textarea
      clearAble
      label="Feedback"
      defaultValue="Textarea uncontrolled juga bisa di-clear."
      clearLabel="Hapus feedback"
      onClear={() => setClearedAt(new Date().toLocaleTimeString())}
    />
  `);

  const counterExample = dedent(`
    const [value, setValue] = useState('');

    <Textarea
      clearAble
      label="Bio"
      maxLength={120}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      hint={\`\${value.length}/120 karakter\`}
      placeholder="Ceritakan tentang dirimu..."
    />
  `);

  const errorExample = dedent(`
    <Textarea
      clearAble
      required
      label="Alamat"
      defaultValue="Jl."
      errorMessages="Alamat minimal 10 karakter."
      placeholder="Tulis alamat lengkap..."
    />
  `);

  const stateExample = dedent(`
    <div className="flex flex-col gap-4">
      <Textarea
        clearAble
        disabled
        label="Disabled"
        defaultValue="Tombol clear disembunyikan saat disabled."
      />
      <Textarea
        clearAble
        readOnly
        label="Read Only"
        defaultValue="Tombol clear disembunyikan saat readOnly."
      />
    </div>
  `);

  const sizeExample = dedent(`
    <div className="flex flex-col gap-4">
      <Textarea
        label="Default"
        hint="min-h-30 + field-sizing-content: tinggi tumbuh mengikuti isi."
        placeholder="Ketik beberapa baris untuk melihat tingginya tumbuh..."
      />
      <Textarea
        className="min-h-20"
        label="Compact (min-h-20)"
        placeholder="Tinggi minimum dikecilkan lewat className"
      />
      <Textarea
        className="min-h-50"
        label="Tinggi (min-h-50)"
        hint="Atribut rows diabaikan karena tinggi diatur lewat min-h-*."
        placeholder="Tinggi minimum dibesarkan lewat className"
      />
    </div>
  `);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Text Area"
        description="Input teks multi-baris untuk isian panjang seperti catatan, deskripsi, atau alasan. Tingginya otomatis mengikuti isi dan bisa dilengkapi tombol clear."
      />

      <div className="flex flex-col gap-8">
        <GridWrapper>
          <MainSection
            title="Text Area"
            code={defaultExample}
            className="col-span-2"
          >
            <Textarea placeholder="Tulis sesuatu di sini..." />
          </MainSection>

          <MainSection title="Label, Description & Hint" code={labelExample}>
            <Textarea
              label="Deskripsi"
              description="Jelaskan kebutuhanmu sedetail mungkin."
              hint="Minimal 20 karakter."
              placeholder="Tulis deskripsi..."
            />
          </MainSection>

          <MainSection title="Required & Tooltip" code={requiredExample}>
            <Textarea
              required
              label="Alasan Pengajuan"
              tooltip="Dipakai tim approval untuk meninjau pengajuanmu."
              placeholder="Tulis alasan pengajuan..."
            />
          </MainSection>

          <MainSection
            title="Clearable (Controlled)"
            code={clearableExample}
            className="col-span-2"
          >
            <div className="flex flex-col gap-2">
              <Textarea
                clearAble
                label="Catatan"
                value={clearableValue}
                onChange={(e) => setClearableValue(e.target.value)}
                placeholder="Tulis catatan..."
              />
              <Text
                variant="t3"
                className="text-gray-600"
                value={`Panjang nilai saat ini: ${clearableValue.length} karakter`}
              />
            </div>
          </MainSection>

          <MainSection title="Clearable + onClear" code={clearCallbackExample}>
            <div className="flex flex-col gap-2">
              <Textarea
                clearAble
                label="Feedback"
                defaultValue="Textarea uncontrolled juga bisa di-clear."
                clearLabel="Hapus feedback"
                onClear={() => setClearedAt(new Date().toLocaleTimeString())}
              />
              <Text
                variant="t3"
                className="text-gray-600"
                value={
                  clearedAt !== null
                    ? `Terakhir dikosongkan pukul ${clearedAt}`
                    : 'Belum pernah dikosongkan.'
                }
              />
            </div>
          </MainSection>

          <MainSection
            title="Clearable + Character Count"
            code={counterExample}
          >
            <Textarea
              clearAble
              label="Bio"
              maxLength={120}
              value={counterValue}
              onChange={(e) => setCounterValue(e.target.value)}
              hint={`${counterValue.length}/120 karakter`}
              placeholder="Ceritakan tentang dirimu..."
            />
          </MainSection>

          <MainSection title="Validasi" code={errorExample}>
            <Textarea
              clearAble
              required
              label="Alamat"
              defaultValue="Jl."
              errorMessages="Alamat minimal 10 karakter."
              placeholder="Tulis alamat lengkap..."
            />
          </MainSection>

          <MainSection title="Disabled & Read Only" code={stateExample}>
            <div className="flex flex-col gap-4">
              <Textarea
                clearAble
                disabled
                label="Disabled"
                defaultValue="Tombol clear disembunyikan saat disabled."
              />
              <Textarea
                clearAble
                readOnly
                label="Read Only"
                defaultValue="Tombol clear disembunyikan saat readOnly."
              />
            </div>
          </MainSection>

          <MainSection title="Ukuran & Tinggi" code={sizeExample}>
            <div className="flex flex-col gap-4">
              <Textarea
                label="Default"
                hint="min-h-30 + field-sizing-content: tinggi tumbuh mengikuti isi."
                placeholder="Ketik beberapa baris untuk melihat tingginya tumbuh..."
              />
              <Textarea
                className="min-h-20"
                label="Compact (min-h-20)"
                placeholder="Tinggi minimum dikecilkan lewat className"
              />
              <Textarea
                className="min-h-50"
                label="Tinggi (min-h-50)"
                hint="Atribut rows diabaikan karena tinggi diatur lewat min-h-*."
                placeholder="Tinggi minimum dibesarkan lewat className"
              />
            </div>
          </MainSection>
        </GridWrapper>

        <Footer
          backTo="/playground/text-editor"
          backToTitle="Text Editor"
          nextTo="/playground/month-picker"
          title="Text Area"
          nextToTitle="Month Picker"
        />
      </div>
    </>
  );
}
