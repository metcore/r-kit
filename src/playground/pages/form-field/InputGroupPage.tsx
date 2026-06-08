import { Icon } from '../../../components/icons';
import { Input } from '../../../components/input';
import { Text } from '../../../components/text';
import illust from '../../../assets/images/forms.png';
import MainSection from '../../components/MainSection';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from '../../../components/dropdown';
import afghanistan from '../../../assets/images/flag/afghanistan.png';
import albania from '../../../assets/images/flag/albania.png';
import algeria from '../../../assets/images/flag/algeria.png';
import america from '../../../assets/images/flag/america.png';
import andorra from '../../../assets/images/flag/andorra.png';
import dedent from 'dedent';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
import {
  InputGroup,
  InputGroupText,
} from '../../../components/input-group/input-group';
import { Modal, ModalBody, ModalFooter, Select } from '../../../clients';
import { Button } from '../../../components/button';
import {
  toSelectOptions,
  type SelectOption,
} from '../../../components/select/helpers';
import { useState } from 'react';
import { InputGroupKbd } from '../../../components/input-group/input-group-kbd';
interface Countries {
  name: string;
  flag: string;
  phone: string;
}

export default function InputGroupPage() {
  const [modal, setModal] = useState<boolean>(false);
  const countries: Countries[] = [
    { name: 'Afghanistan', flag: afghanistan, phone: '+93' },
    { name: 'Albania', flag: albania, phone: '+355' },
    { name: 'Algeria', flag: algeria, phone: '+213' },
    { name: 'America', flag: america, phone: '+1' },
    { name: 'Andorra', flag: andorra, phone: '+376' },
  ];

  const codeBasicGroup = dedent(`
    <InputGroup>
      <InputGroupText>
        <Icon name="search" size={18} />
      </InputGroupText>
      <Input placeholder="Search..." />
      <Button color="primary">Search</Button>
    </InputGroup>
  `);

  const codeSelectGroup = dedent(`
    <InputGroup label="Phone Number">
      <Select
        options={phoneCodes}
        value={phoneCode}
        onChange={(option) => setPhoneCode(option as PhoneCode)}
        isSearchable={false}
        isClearable={false}
      />
      <Input type="tel" placeholder="Enter phone number" />
    </InputGroup>
  `);

  const codeDropdownGroup = dedent(`
    <InputGroup>
      <Dropdown>
        <DropdownTrigger>
          <Button color="primary">Options</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>
            <Icon name="user" />
            Another Action
          </DropdownItem>
          <DropdownItem>Something Else</DropdownItem>
          <DropdownSeparator />
          <DropdownItem>Separated Link</DropdownItem>
        </DropdownContent>
      </Dropdown>
      <InputGroupText>
        <Icon name="search" size={18} />
      </InputGroupText>
      <Input placeholder="Search..." />
    </InputGroup>
  `);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Input Group"
        description="Menggabungkan input field dengan elemen pendukung seperti ikon, prefix, atau suffix untuk memperkuat konteks input."
      />

      <div className="flex flex-col gap-8">
        <GridWrapper>
          <MainSection
            title="Input Group"
            className="flex-1"
            code={codeBasicGroup}
          >
            <InputGroup>
              <InputGroupText>
                <Icon name="search" size={18} />
              </InputGroupText>
              <Input placeholder="Search..." />
              <Button color="primary">Search</Button>
            </InputGroup>
            <InputGroup>
              <InputGroupText>
                <Icon name="search" size={18} />
              </InputGroupText>
              <Input placeholder="Search..." />
              <InputGroupKbd size="sm">
                <Icon name="arrow-turn-down-left" size={12} />
              </InputGroupKbd>
            </InputGroup>
          </MainSection>
          <MainSection
            title="Input Group + Select"
            className="flex-1"
            code={codeSelectGroup}
          >
            <InputGroup label="Phone Number">
              <Select
                options={toSelectOptions(countries, {
                  value: 'name',
                  label: 'flag',
                })}
                renderOption={(value) => {
                  return <Country country={value} />;
                }}
              />
              <Input type="tel" placeholder="Enter phone number" />
            </InputGroup>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection
            title="Input Group + Dropdown"
            className="flex-1"
            code={codeDropdownGroup}
          >
            <InputGroup>
              <Dropdown>
                <DropdownTrigger>
                  <Button color="primary">Chose FIle</Button>
                </DropdownTrigger>
                <DropdownContent>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>
                    <div className="flex flex-wrap items-center gap-2">
                      <Icon name="user" />
                      Another Action
                    </div>
                  </DropdownItem>
                  <DropdownItem>Something Else</DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem>Separated Link</DropdownItem>
                </DropdownContent>
              </Dropdown>
              <Input placeholder="Search..." />
            </InputGroup>
          </MainSection>
          <MainSection
            title="Input Group + Modal"
            className="flex-1"
            code={codeDropdownGroup}
          >
            <InputGroup>
              <InputGroupText>
                <Icon name="search" size={18} />
              </InputGroupText>
              <Input placeholder="Search..." />
              <Button onClick={() => setModal(true)}>
                Create <Icon name="plus" size={15} />
              </Button>
            </InputGroup>
          </MainSection>
        </GridWrapper>
        <Modal
          isOpen={modal}
          position="top"
          title="Modal Top Title"
          description="modal top description"
          onClose={() => setModal(false)}
        >
          <ModalBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In culpa,
            provident nihil, accusamus praesentium quo asperiores eaque porro
            distinctio odio nobis, molestiae aliquam aperiam iusto rem aut sunt
            sint explicabo.
          </ModalBody>
          <ModalFooter className="justify-between">
            <Button variant="outline" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button onClick={() => setModal(false)}>Ok</Button>
          </ModalFooter>
        </Modal>
        <Footer
          backTo="/input-field"
          backToTitle="Input Field"
          nextTo="/counter"
          title="Input Group"
          nextToTitle="Counter"
        />
      </div>
    </>
  );
}

const Country = ({ country }: { country: SelectOption }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <img src={country.label} className="h-4" />
      <Text value={country.value} variant="t2" weight="medium" />
    </div>
  );
};
