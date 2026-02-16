import { useState } from "react";
import { Icon } from "../../../components/icons";
import { Input } from "../../../components/input";
import { Text } from "../../../components/text";
import illust from "../../assets/images/forms.png";
import GridWrapper from "../../components/GridWrapper";
import HeroSection from "../../components/HeroSection";
import MainSection from "../../components/MainSection";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../../../components/dropdown";
import afghanistan from "../../assets/images/flag/afghanistan.png";
import albania from "../../assets/images/flag/albania.png";
import algeria from "../../assets/images/flag/algeria.png";
import america from "../../assets/images/flag/america.png";
import andorra from "../../assets/images/flag/andorra.png";
import Footer from "../../components/Footer";
import dedent from "dedent";

interface Countries {
  name: string;
  flag: string;
  phone: string;
}

export default function InputGroupPage() {
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [inputPhoneWidth, setInputPhoneWidth] = useState(0);
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Countries | null>(
    null,
  );

  const countries: Countries[] = [
    {
      name: "Afghanistan",
      flag: afghanistan,
      phone: "+93",
    },
    {
      name: "Albania",
      flag: albania,
      phone: "+355",
    },
    {
      name: "Algeria",
      flag: algeria,
      phone: "+213",
    },
    {
      name: "America",
      flag: america,
      phone: "+1",
    },
    {
      name: "Andorra",
      flag: andorra,
      phone: "+376",
    },
  ];

  const filteredCountry = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  const exampleInputGroup = dedent(`
    <Input
      label="Input Addon"
      placeholder="Username"
      leftAddon={<Icon name="user" size={18} />}
    />
  `);

  const exampleInputMergedAddon = dedent(`
    <Input
      mergedAddon
      label="Input Addon"
      placeholder="Username"
      leftAddon={<Icon name="user" size={18} />}
    />
  `);

  const exampleInputSize = dedent(`
    <div className="flex flex-col gap-6">
      <Input
        placeholder="Input Small"
        size={"sm"}
        leftAddon={<Icon name="user" size={18} />}
      />
      <Input
        placeholder="Input Medium"
        size={"md"}
        leftAddon={<Icon name="user" size={18} />}
      />
      <Input
        placeholder="Input Large"
        size={"lg"}
        leftAddon={<Icon name="user" size={18} />}
      />
    </div>
  `);

  const exampleInputMergedSize = dedent(`
    <div className="flex flex-col gap-6">
      <Input
        mergedAddon
        placeholder="Input Small"
        size={"sm"}
        leftAddon={<Icon name="user" size={18} />}
      />
      <Input
        mergedAddon
        placeholder="Input Medium"
        size={"md"}
        leftAddon={<Icon name="user" size={18} />}
      />
      <Input
        mergedAddon
        placeholder="Input Large"
        size={"lg"}
        leftAddon={<Icon name="user" size={18} />}
      />
    </div>
  `);

  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Input Group"
        description="Menggabungkan input field dengan elemen pendukung seperti ikon, prefix, atau suffix untuk memperkuat konteks input."
      />

      <div className="flex flex-col gap-8">
        <GridWrapper>
          <MainSection title="Input Group" code={exampleInputGroup}>
            <div className="flex flex-col gap-6">
              <Input
                label="Input Addon"
                placeholder="Username"
                leftAddon={<Icon name="user" size={18} />}
              />
              <Input
                label="Input Nominal"
                leftAddon={
                  <Text
                    value="Rp"
                    variant="t2"
                    weight="medium"
                    className="text-gray-800"
                  />
                }
              />
              <Input
                label="Input Link"
                leftAddon={
                  <Text
                    value="http://"
                    variant="t2"
                    weight="medium"
                    className="text-gray-800"
                  />
                }
              />
              <Input
                type="number"
                label="Input Tinggi Badan"
                placeholder="0"
                rightAddon={
                  <Text
                    value="CM"
                    variant="t2"
                    weight="medium"
                    className="text-gray-800"
                  />
                }
              />
              <Input
                label="Password"
                placeholder="Password"
                type={isTypePassword ? "password" : "text"}
                rightAddonClassName="!border-l-0"
                leftAddon={<Icon name="lock-fill" size={20} />}
                rightAddon={
                  <button onClick={() => setIsTypePassword(!isTypePassword)}>
                    <Icon
                      name={isTypePassword ? "eye" : "eye-open"}
                      size={20}
                    />
                  </button>
                }
              />
              <Input
                label="Input Phone Number"
                placeholder="Enter Phone Number"
                type="tel"
                className="relative"
                onContainerResize={(w) => setInputPhoneWidth(w)}
                leftAddon={
                  <Dropdown>
                    <DropdownTrigger>
                      <FlagButton
                        flag={selectedCountry?.flag || afghanistan}
                        phone={selectedCountry?.phone || "+93"}
                      />
                    </DropdownTrigger>
                    <DropdownContent
                      align="start"
                      className="-translate-x-2.5 gap-2"
                      style={{ width: inputPhoneWidth }}
                    >
                      <Input
                        mergedAddon
                        placeholder="Search"
                        leftAddonClassName="!pr-0"
                        leftAddon={<Icon name="search" size={20} />}
                        onChange={(e) => setCountrySearch(e.target.value)}
                      />
                      {filteredCountry.map((country) => (
                        <DropdownItem
                          key={country.name}
                          onClick={() => setSelectedCountry(country)}
                        >
                          <Country country={country} />
                        </DropdownItem>
                      ))}
                    </DropdownContent>
                  </Dropdown>
                }
              />
            </div>
          </MainSection>

          <MainSection title="Merged Addon" code={exampleInputMergedAddon}>
            <div className="flex flex-col gap-6">
              <Input
                mergedAddon
                label="Input Addon"
                placeholder="Username"
                leftAddon={<Icon name="user" size={18} />}
              />
              <Input
                mergedAddon
                label="Input Nominal"
                leftAddon={
                  <Text
                    value="Rp"
                    variant="t2"
                    weight="medium"
                    className="text-gray-800"
                  />
                }
              />
              <Input
                mergedAddon
                label="Input Link"
                leftAddon={
                  <Text
                    value="http://"
                    variant="t2"
                    weight="medium"
                    className="text-gray-800"
                  />
                }
              />
              <Input
                mergedAddon
                type="number"
                label="Input Tinggi Badan"
                placeholder="0"
                rightAddon={
                  <Text
                    value="CM"
                    variant="t2"
                    weight="medium"
                    className="text-gray-800"
                  />
                }
              />
              <Input
                mergedAddon
                label="Password"
                placeholder="Password"
                type={isTypePassword ? "password" : "text"}
                leftAddon={<Icon name="lock-fill" size={20} />}
                rightAddon={
                  <button onClick={() => setIsTypePassword(!isTypePassword)}>
                    <Icon
                      name={isTypePassword ? "eye" : "eye-open"}
                      size={20}
                    />
                  </button>
                }
              />
              <Input
                mergedAddon
                label="Input Phone Number"
                placeholder="Enter Phone Number"
                type="tel"
                className="relative"
                onContainerResize={(w) => setInputPhoneWidth(w)}
                leftAddon={
                  <Dropdown>
                    <DropdownTrigger>
                      <FlagButton
                        flag={selectedCountry?.flag || afghanistan}
                        phone={selectedCountry?.phone || "+93"}
                      />
                    </DropdownTrigger>
                    <DropdownContent
                      align="start"
                      className="-translate-x-2.5 gap-2"
                      style={{ width: inputPhoneWidth }}
                    >
                      <Input
                        mergedAddon
                        placeholder="Search"
                        leftAddonClassName="!pr-0"
                        leftAddon={<Icon name="search" size={20} />}
                        onChange={(e) => setCountrySearch(e.target.value)}
                      />
                      {filteredCountry.map((country) => (
                        <DropdownItem
                          key={country.name}
                          onClick={() => setSelectedCountry(country)}
                        >
                          <Country country={country} />
                        </DropdownItem>
                      ))}
                    </DropdownContent>
                  </Dropdown>
                }
              />
            </div>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection title="Input Group Size" code={exampleInputSize}>
            <div className="flex flex-col gap-6">
              <Input
                placeholder="Input Small"
                size={"sm"}
                leftAddon={<Icon name="user" size={18} />}
              />
              <Input
                placeholder="Input Medium"
                size={"md"}
                leftAddon={<Icon name="user" size={18} />}
              />
              <Input
                placeholder="Input Large"
                size={"lg"}
                leftAddon={<Icon name="user" size={18} />}
              />
            </div>
          </MainSection>
          <MainSection title="Input Group Size" code={exampleInputMergedSize}>
            <div className="flex flex-col gap-6">
              <Input
                mergedAddon
                placeholder="Input Small"
                size={"sm"}
                leftAddon={<Icon name="user" size={18} />}
              />
              <Input
                mergedAddon
                placeholder="Input Medium"
                size={"md"}
                leftAddon={<Icon name="user" size={18} />}
              />
              <Input
                mergedAddon
                placeholder="Input Large"
                size={"lg"}
                leftAddon={<Icon name="user" size={18} />}
              />
            </div>
          </MainSection>
        </GridWrapper>

        <Footer
          backTo="/input-field"
          backToTitle="Input Field"
          nextTo="/counter"
          title="Input Group"
          nextToTitle="Counter"
        />
      </div>
    </DashboardLayout>
  );
}

const Country = ({ country }: { country: Countries }) => {
  return (
    <>
      <img src={country.flag} className="h-4" />
      <Text value={country.name} variant="t2" weight="medium" />
    </>
  );
};

const FlagButton = ({ flag, phone }: { flag: string; phone: string }) => {
  return (
    <div className="relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-200 py-1 pr-8 pl-3.5 hover:bg-gray-100">
      <img src={flag} className="h-4" />
      <Text value={phone} variant="t3" />
      <Icon name="angle-down-small" className="absolute right-1.5" size={12} />
    </div>
  );
};
