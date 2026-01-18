import React, { useEffect } from "react";
import { RadioGroup, Radio } from "../../components/radio";
import DashboardLayout from "../layouts/DashboardLayout";
import { Checkbox, CheckboxGroup } from "../../components/checkbox/checkbox";
import { Input } from "../../components/input";

export const RadioButtonPage = () => {
  return (
    <div>
      <RadioExample />
    </div>
  );
};

function RadioExample() {
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState("credit");
  const [value1, setValue1] = React.useState("option1");
  const [value2, setValue2] = React.useState("option1");
  const [value3, setValue3] = React.useState("option1");

  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Radio - Different Sizes
          </h3>
          <div className="space-y-6">
            <RadioGroup
              value={value1}
              onValueChange={setValue1}
              size="sm"
              color="primary"
            >
              <Radio value="option1" label="Small Size" />
              <Radio value="option2" label="Option 2" />
            </RadioGroup>

            <RadioGroup
              value={value2}
              onValueChange={setValue2}
              size="md"
              color="success"
            >
              <Radio value="option1" label="Medium Size (Default)" />
              <Radio value="option2" label="Option 2" />
            </RadioGroup>

            <RadioGroup
              value={value3}
              onValueChange={setValue3}
              size="lg"
              color="danger"
            >
              <Radio value="option1" label="Large Size" />
              <Radio value="option2" label="Option 2" />
            </RadioGroup>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Radio - Different Colors
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <Radio value="1" label="Primary" color="primary" checked />
            <Radio value="2" label="Success" color="success" checked />
            <Radio value="3" label="Danger" color="danger" checked />
            <Radio value="4" label="Warning" color="warning" checked />
            <Radio value="5" label="Info" color="info" checked />
            <Radio value="6" label="Purple" color="purple" checked />
            <Radio value="7" label="Orange" color="orange" checked />
            <Radio value="8" label="Gray" color="gray" checked />
          </div>
        </div>
        <div>
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
        </div>
        <div>
          <CheckboxGroup
            label="Pilih Hobi"
            description="Anda bisa memilih lebih dari satu"
            hint="Minimal pilih 1 hobi"
            errorMessages="Harap pilih minimal 1 hobi"
            direction="horizontal"
            name="hobbies"
            color="purple"
            required
            // value={selectedHobbies}
            // onValueChange={setSelectedHobbies}
          >
            <Checkbox
              value="reading"
              label="Membaca"
              color="danger"
              onCheckedChange={(e) => {
                console.log("e", e);
              }}
              description="Buku, artikel, dll"
            />
            <Checkbox
              value="sports"
              label="Olahraga"
              description="Sepak bola, basket, dll"
            />
            <Checkbox
              value="music"
              label="Musik"
              description="Mendengar atau bermain musik"
            />
          </CheckboxGroup>
          <Checkbox
            required
            checked={checked}
            onCheckedChange={setChecked}
            value="reading"
            label="Membaca"
            color="danger"
            description="Buku, artikel, dll"
          />
          <div className="space-y-4">
            <Input
              label="email"
              size={"sm"}
              hint="email is required"
              errorMessages={"email is required"}
            />

            <Input
              label="email"
              size={"md"}
              hint="email is required"
              errorMessages={"email is required"}
            />
          </div>
        </div>
        <div>
          <Checkbox
            required
            // checked={agreed}
            // onCheckedChange={setAgreed}
            label="Saya setuju dengan syarat dan ketentuan"
            description="Dengan mencentang, Anda menyetujui semua kebijakan kami"
            hint="Wajib dicentang untuk melanjutkan"
            errorMessages="Anda harus menyetujui syarat dan ketentuan"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
