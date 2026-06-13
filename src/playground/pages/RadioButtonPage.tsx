import { RadioGroup, Radio } from '../../components/radio';
import React from 'react';
import HeroSection from '../components/HeroSection';
import illust from '../../assets/images/forms.png';
import MainSection from '../components/MainSection';
import { CheckboxGroup } from '../../clients';
import GridWrapper from '../components/GridWrapper';

export default function RadioButtonPage() {
  const [value1, setValue1] = React.useState('option1');

  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Radio Button"
        description="Memungkinkan user memilih satu opsi dari beberapa pilihan."
      />
      <GridWrapper>
        <MainSection title="basic">
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
        <MainSection title="Label">
          <CheckboxGroup direction="horizontal">
            <RadioGroup
              value={value1}
              onValueChange={setValue1}
              color="primary"
              label="Radio Button"
            >
              <Radio value="option1" label="Value" />
              <Radio value="option2" label="Value2" />
            </RadioGroup>
          </CheckboxGroup>
        </MainSection>
        <MainSection title="tooltip">
          <CheckboxGroup direction="horizontal">
            <RadioGroup
              value={value1}
              onValueChange={setValue1}
              color="primary"
              tooltip="Action from"
              label="Radio Button"
            >
              <Radio value="option1" label="Value" />
              <Radio value="option2" label="Value2" />
            </RadioGroup>
          </CheckboxGroup>
        </MainSection>
        <MainSection title="hint & deskripsi">
          <CheckboxGroup direction="horizontal">
            <RadioGroup
              value={value1}
              onValueChange={setValue1}
              description="Pilih salah satu metode pembayaran"
              hint="Semua metode pembayaran aman"
              color="primary"
              tooltip="Action from"
              label="Radio Button"
            >
              <Radio value="option1" label="Value" />
              <Radio value="option2" label="Value2" />
            </RadioGroup>
          </CheckboxGroup>
        </MainSection>
        <MainSection title="hint & deskripsi">
          <RadioGroup
            value={value1}
            onValueChange={setValue1}
            description="Pilih salah satu metode pembayaran"
            hint="Semua metode pembayaran aman"
            color="primary"
            tooltip="Action from"
            label="Radio Button"
          >
            <Radio
              value="credit"
              label="Kartu Kredit"
              description="Visa, Mastercard, dll"
            />
            <Radio
              value="bank"
              label="Transfer Bank"
              description="BCA, Mandiri, BNI"
            />
            <Radio
              value="ewallet"
              label="E-Wallet"
              description="GoPay, OVO, Dana"
            />
          </RadioGroup>
        </MainSection>
        <MainSection title="Error Message">
          <RadioGroup
            value={value1}
            onValueChange={setValue1}
            description="Pilih salah satu metode pembayaran"
            hint="Semua metode pembayaran aman"
            color="primary"
            tooltip="Action from"
            errorMessages="Harap pilih metode pembayaran"
            label="Radio Button"
          >
            <Radio
              value="credit"
              label="Kartu Kredit"
              description="Visa, Mastercard, dll"
            />
            <Radio
              value="bank"
              label="Transfer Bank"
              description="BCA, Mandiri, BNI"
            />
            <Radio
              value="ewallet"
              label="E-Wallet"
              description="GoPay, OVO, Dana"
            />
          </RadioGroup>
        </MainSection>
        <MainSection title="Horizontal">
          <RadioGroup
            value={value1}
            direction="horizontal"
            onValueChange={setValue1}
            description="Pilih salah satu metode pembayaran"
            hint="Semua metode pembayaran aman"
            color="primary"
            tooltip="Action from"
            errorMessages="Harap pilih metode pembayaran"
            label="Radio Button"
          >
            <Radio
              value="credit"
              label="Kartu Kredit"
              description="Visa, Mastercard, dll"
            />
            <Radio
              value="bank"
              label="Transfer Bank"
              description="BCA, Mandiri, BNI"
            />
            <Radio
              value="ewallet"
              label="E-Wallet"
              description="GoPay, OVO, Dana"
            />
          </RadioGroup>
        </MainSection>
      </GridWrapper>
    </>
  );
}
