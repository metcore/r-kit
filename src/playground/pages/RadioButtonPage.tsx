import { RadioGroup, Radio } from '../../components/radio';
import React from 'react';
import HeroSection from '../components/HeroSection';
import illust from '../../assets/images/forms.png';
import MainSection from '../components/MainSection';
import { CheckboxGroup } from '../../clients';

export default function RadioButtonPage() {
  const [value, setValue] = React.useState('credit');
  const [value1, setValue1] = React.useState('option1');

  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Checkbox"
        description="Memungkinkan user memilih satu, beberapa, atau tidak memilih opsi sama sekali dari daftar pilihan."
      />

      <div className="flex flex-1 flex-col gap-4">
        <MainSection title="Size">
          <CheckboxGroup direction="horizontal">
            <RadioGroup
              value={value1}
              onValueChange={setValue1}
              color="primary"
            >
              <Radio value="option1" label="Value" />
              <Radio value="option2" label="Value2" />
            </RadioGroup>
          </CheckboxGroup>
        </MainSection>
        <MainSection title="Radio Button Horizontal with Teks">
          <CheckboxGroup direction="horizontal">
            <RadioGroup
              label="Pilih Metode Pembayaran"
              description="Pilih salah satu metode pembayaran"
              hint="Semua metode pembayaran aman"
              errorMessages="Harap pilih metode pembayaran"
              direction="vertical"
              name="payment"
              value={value}
              size="md"
              color="danger"
              onValueChange={setValue}
            >
              <Radio
                value="credit"
                label="Kartu Kredit"
                // description="Visa, Mastercard, dll"
              />
              <Radio
                value="bank"
                label="Transfer Bank"
                // description="BCA, Mandiri, BNI"
              />
              <Radio
                value="ewallet"
                label="E-Wallet"
                // description="GoPay, OVO, Dana"
              />
            </RadioGroup>
          </CheckboxGroup>
        </MainSection>
      </div>
    </>
  );
}
