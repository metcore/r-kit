import dedent from 'dedent';
import illust from '../../../assets/images/forms.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';
import { Slider } from '../../../components/slider/slider';
import { useState } from 'react';

export const SliderPage = () => {
  // State untuk masing-masing varian
  const [valueSingle, setValueSingle] = useState(0);
  const [valueRange, setValueRange] = useState<[number, number]>([200, 500]);
  const [valueStep, setValueStep] = useState(20);
  const [valueDisabled, setValueDisabled] = useState(50);

  // String template untuk dokumentasi kode di MainSection
  const singleExample = dedent(`
    <Slider
      value={value}
      label="Volume"
      onChange={(val) => setValue(val)}
      min={0}
      max={100}
    />
  `);

  const rangeExample = dedent(`
    <Slider
      range
      value={valueRange}
      onChange={(val) => setValueRange(val)}
      min={0}
      max={1000}
      hint="Pilih rentang harga"
    />
  `);

  const stepExample = dedent(`
    <Slider
      value={valueStep}
      label="Kelipatan Rentang"
      onChange={(val) => setValueStep(val)}
      min={0}
      max={100}
      step={10} // Melompat per 10 angka
    />
  `);

  const disabledExample = dedent(`
    <Slider
      disabled
      value={valueDisabled}
      label="Slider Nonaktif"
      onChange={(val) => setValueDisabled(val)}
    />
  `);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Sliders" // Diubah ke Sliders agar sesuai konteks komponen
        description="Komponen input yang memungkinkan pengguna memilih nilai tunggal atau rentang nilai dari batas yang ditentukan."
      />

      <div className="flex flex-col gap-8">
        <GridWrapper>
          {/* Varian 1: Single Slider (Default dengan Label & Validasi) */}
          <MainSection title="Single Slider (Default)" code={singleExample}>
            <Slider
              value={valueSingle}
              label="Volume Suara"
              onChange={(e) => setValueSingle(e)}
              max={100}
              min={0}
              required
              hint="Geser untuk mengatur volume"
              description="Pengaturan volume global"
              tooltip="Volume level"
            />
          </MainSection>

          <MainSection title="Range Slider" code={rangeExample}>
            <Slider
              range
              value={valueRange}
              onChange={(e) => setValueRange(e)}
              min={0}
              max={1000}
              label="Filter Harga (IDR)"
              hint={`Nilai terpilih: ${valueRange[0]} - ${valueRange[1]}`}
            />
          </MainSection>

          <MainSection title="Slider dengan Custom Step" code={stepExample}>
            <Slider
              value={valueStep}
              label="Pilih Skor (Kelipatan 10)"
              onChange={(e) => setValueStep(e)}
              min={0}
              max={100}
              step={10}
              hint={`Nilai saat ini: ${valueStep}`}
            />
          </MainSection>

          <MainSection title="Disabled State" code={disabledExample}>
            <Slider
              disabled
              value={valueDisabled}
              label="Slider Terkunci"
              onChange={(e) => setValueDisabled(e)}
            />
          </MainSection>
        </GridWrapper>

        <Footer
          backTo="/radio-button"
          backToTitle="Radio Button"
          nextTo="/color-picker"
          title="Sliders"
          nextToTitle="Color Picker"
        />
      </div>
    </>
  );
};
