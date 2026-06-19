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
  InputGroupControl,
  InputGroupText,
} from '../../../components/input-group/input-group';
import {
  InputFile,
  Modal,
  ModalBody,
  ModalFooter,
  Radio,
  Select,
  Switch,
} from '../../../clients';
import { Button } from '../../../components/button';
import {
  toSelectOptions,
  type SelectOption,
} from '../../../components/select/helpers';
import { useState } from 'react';
import { InputGroupKbd } from '../../../components/input-group/input-group-kbd';
import { useInputFile } from '../../../components/input-file/use-input-file';
import { InputFilePreview } from '../../../components/input-file/input-file-preview';

interface Countries {
  name: string;
  flag: string;
  phone: string;
}

const codePrefixText = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';

  export default function PrefixTextExample() {
    return (
      <InputGroup label="Website">
        <InputGroupText>https://</InputGroupText>
        <Input placeholder="your-domain.com" />
      </InputGroup>
    );
  }
`);

const codeSuffixText = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';

  export default function SuffixTextExample() {
    return (
      <InputGroup label="Weight">
        <Input placeholder="0" />
        <InputGroupText>kg</InputGroupText>
      </InputGroup>
    );
  }
`);

const codeCurrency = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';

  export default function CurrencyExample() {
    return (
      <InputGroup label="Price">
        <InputGroupText>IDR</InputGroupText>
        <Input placeholder="0" />
      </InputGroup>
    );
  }
`);

const codeEmail = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';

  export default function EmailExample() {
    return (
      <InputGroup label="Email">
        <Input placeholder="username" />
        <InputGroupText>@gmail.com</InputGroupText>
      </InputGroup>
    );
  }
`);

const radioBuilder = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';

  export default function UrlBuilderExample() {
    return (
      <InputGroup label="Slug">
        <InputGroupText>https://example.com/</InputGroupText>
        <Input placeholder="product-name" />
      </InputGroup>
    );
  }
`);

const switchExample = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input, switch } from '@herca/r-kit/input';

  export default function UrlBuilderExample() {
    return (
      <InputGroup label="Slug">
          <Switch />
          <Input placeholder="product-name" />
      </InputGroup>
    );
  }
`);

const codePassword = dedent(`
  import { useState } from 'react';
  import { InputGroup } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Button } from '@herca/r-kit/button';
  import { Icon } from '@herca/r-kit/icons';

  export default function PasswordExample() {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <InputGroup label="Password">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
        />
        <Button
          variant="default"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Icon name={showPassword ? 'eye-open' : 'eye'} size={16} />
        </Button>
      </InputGroup>
    );
  }
`);

const codePhoneSelect = dedent(`
  import { InputGroup } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Text } from '@herca/r-kit/text';
  import { Select } from '@herca/r-kit  import {
    toSelectOptions,
    type SelectOption,
  } from '@herca/r-kit/select/helpers';
  import afghanistan from '@herca/r-kitges/flag/afghanistan.png';
  import albania from '@herca/r-kitges/flag/albania.png';
  import algeria from '@herca/r-kitges/flag/algeria.png';
  import america from '@herca/r-kitges/flag/america.png';
  import andorra from '@herca/r-kitges/flag/andorra.png';

  interface Countries {
    name: string;
    flag: string;
    phone: string;
  }

  export default function PhoneSelectExample() {
    const countries: Countries[] = [
      { name: 'Afghanistan', flag: afghanistan, phone: '+93' },
      { name: 'Albania', flag: albania, phone: '+355' },
      { name: 'Algeria', flag: algeria, phone: '+213' },
      { name: 'America', flag: america, phone: '+1' },
      { name: 'Andorra', flag: andorra, phone: '+376' },
    ];

    return (
      <InputGroup size="md" label="Medium">
        <Select
          options={toSelectOptions(countries, {
            value: 'name',
            label: 'flag',
          })}
          renderOption={(value) => <Country country={value} />}
        />
        <Input type="tel" placeholder="Enter phone number" />
      </InputGroup>
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
`);

const codeSearch = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Button } from '@herca/r-kit/button';
  import { Icon } from '@herca/r-kit/icons';

  export default function SearchExample() {
    return (
      <InputGroup label="Search Product">
        <InputGroupText>
          <Icon name="search" size={18} />
        </InputGroupText>
        <Input placeholder="Search..." />
        <Button color="primary">Search</Button>
      </InputGroup>
    );
  }
`);

const codeOtp = dedent(`
  import { InputGroup } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Button } from '@herca/r-kit/button';

  export default function OtpExample() {
    return (
      <InputGroup label="Verification Code">
        <Input placeholder="Enter code" />
        <Button variant="outline">Send OTP</Button>
      </InputGroup>
    );
  }
`);

const codeKeyboardShortcut = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { InputGroupKbd } from '@herca/r-kit/input-group/input-group-kbd';
  import { Input } from '@herca/r-kit/input';
  import { Icon } from '@herca/r-kit/icons';

  export default function KeyboardShortcutExample() {
    return (
      <InputGroup>
        <InputGroupText>
          <Icon name="table" />
        </InputGroupText>
        <Input placeholder="Type command..." />
        <InputGroupKbd>⏎</InputGroupKbd>
      </InputGroup>
    );
  }
`);

const codeDropdownGroup = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Button } from '@herca/r-kit/button';
  import { Icon } from '@herca/r-kit/icons';
  import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownSeparator,
    DropdownTrigger,
  } from '@herca/r-kit/dropdown';

  export default function DropdownGroupExample() {
    return (
      <InputGroup>
        <InputGroupText>
          <Icon name="table" />
        </InputGroupText>
        <Input placeholder="Type command..." />
        <Dropdown>
          <DropdownTrigger>
            <Button color="primary">Another</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>
              <div className="flex flex-wrap items-center gap-2">
                <Icon name="user" /> Another Action
              </div>
            </DropdownItem>
            <DropdownItem>Something Else</DropdownItem>
            <DropdownSeparator />
            <DropdownItem>Separated Link</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </InputGroup>
    );
  }
`);

const codeInputActions = dedent(`
  import { InputGroup } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Button } from '@herca/r-kit/button';
  import { Icon } from '@herca/r-kit/icons';

  export default function InputActionsExample() {
    return (
      <InputGroup label="Customer">
        <Input placeholder="Select customer..." />
        <Button variant="outline">
          <Icon name="user" />
        </Button>
        <Button variant="outline">
          <Icon name="plus" />
        </Button>
      </InputGroup>
    );
  }
`);

const codeDisabled = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Icon } from '@herca/r-kit/icons';

  export default function DisabledExample() {
    return (
      <InputGroup disabled label="Disabled Input">
        <InputGroupText>
          <Icon name="lock" />
        </InputGroupText>
        <Input value="Disabled value" />
      </InputGroup>
    );
  }
`);

const codeErrorState = dedent(`
  import { InputGroup } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';

  export default function ErrorStateExample() {
    return (
      <InputGroup label="Email" errorMessages="Email already exists">
        <Input placeholder="email@example.com" />
      </InputGroup>
    );
  }
`);

const codeFileUpload = dedent(`
  import { useState } from 'react';
  import { InputGroup } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Button } from '@herca/r-kit/button';
  import { Icon } from '@herca/r-kit/icons';
  import { InputFile, Modal, ModalBody, ModalFooter } from '@herca/r-kit  import { useInputFile } from '@herca/r-kit/input-file/use-input-file';
  import { InputFilePreview } from '@herca/r-kit/input-file/input-file-preview';

  export default function FileUploadExample() {
    const [modal, setModal] = useState<boolean>(false);
    const fileInput = useInputFile({
      accept: 'image/*,.pdf',
      maxSize: 5 * 1024 * 1024,
    });

    return (
      <>
        <InputGroup>
          <InputFile
            inputFile={fileInput}
            buttonLabel={<Icon name="paperclip" />}
            buttonVariant="tertiary"
            multiple
          />
          <Input placeholder="Search..." />
          <Button onClick={() => setModal(true)}>
            Create <Icon name="plus" size={15} />
          </Button>
        </InputGroup>
        <InputFilePreview inputFile={fileInput} mode="compact" />

        <Modal
          isOpen={modal}
          position="top"
          title="Modal Top Title"
          description="modal top description"
          onClose={() => setModal(false)}
        >
          <ModalBody>Upload your files here.</ModalBody>
          <ModalFooter className="justify-between">
            <Button variant="outline" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button onClick={() => setModal(false)}>Ok</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
`);

const codeWebsiteBuilder = dedent(`
  import { InputGroup } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Select } from '@herca/r-kit
  export default function WebsiteBuilderExample() {
    return (
      <InputGroup>
        <Select
          options={[
            { label: 'https://', value: 'https://' },
            { label: 'http://', value: 'http://' },
          ]}
        />
        <Input placeholder="example.com" />
      </InputGroup>
    );
  }
`);

const codeAmountWithTax = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';

  export default function AmountWithTaxExample() {
    return (
      <InputGroup>
        <InputGroupText>Rp</InputGroupText>
        <Input placeholder="100000" />
        <InputGroupText>+ PPN</InputGroupText>
      </InputGroup>
    );
  }
`);

const codeInvoiceSearch = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Button } from '@herca/r-kit/button';
  import { Icon } from '@herca/r-kit/icons';

  export default function InvoiceSearchExample() {
    return (
      <InputGroup>
        <InputGroupText>#</InputGroupText>
        <Input placeholder="INV-2026-0001" />
        <Button color="primary">
          <Icon name="search" size={15} />
        </Button>
      </InputGroup>
    );
  }
`);

const codeErpCustomer = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Button } from '@herca/r-kit/button';
  import { Icon } from '@herca/r-kit/icons';

  export default function ErpCustomerExample() {
    return (
      <InputGroup label="Customer">
        <InputGroupText>
          <Icon name="user" />
        </InputGroupText>
        <Input placeholder="Choose customer..." />
        <Button variant="outline">New</Button>
        <Button variant="outline">Detail</Button>
      </InputGroup>
    );
  }
`);

const codeProductSearch = dedent(`
  import { InputGroup } from '@herca/r-kit/input-group/input-group';
  import { Input } from '@herca/r-kit/input';
  import { Button } from '@herca/r-kit/button';
  import { Select } from '@herca/r-kit
  export default function ProductSearchExample() {
    return (
      <InputGroup>
        <Select
          options={[
            { label: 'Product', value: 'product' },
            { label: 'SKU', value: 'sku' },
            { label: 'Category', value: 'category' },
          ]}
        />
        <Input placeholder="Search..." />
        <Button color="primary">Search</Button>
      </InputGroup>
    );
  }
`);

const codeQuickCommand = dedent(`
  import { InputGroup, InputGroupText } from '@herca/r-kit/input-group/input-group';
  import { InputGroupKbd } from '@herca/r-kit/input-group/input-group-kbd';
  import { Input } from '@herca/r-kit/input';
  import { Icon } from '@herca/r-kit/icons';

  export default function QuickCommandExample() {
    return (
      <InputGroup>
        <InputGroupText>
          <Icon name="file" />
        </InputGroupText>
        <Input placeholder="Run command..." />
        <InputGroupKbd>Ctrl</InputGroupKbd>
        <InputGroupKbd>K</InputGroupKbd>
      </InputGroup>
    );
  }
`);

export default function InputGroupPage() {
  const [modal, setModal] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const countries: Countries[] = [
    { name: 'Afghanistan', flag: afghanistan, phone: '+93' },
    { name: 'Albania', flag: albania, phone: '+355' },
    { name: 'Algeria', flag: algeria, phone: '+213' },
    { name: 'America', flag: america, phone: '+1' },
    { name: 'Andorra', flag: andorra, phone: '+376' },
  ];

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
        subtitle="Input Group"
        description="Menggabungkan input field dengan elemen pendukung seperti ikon, prefix, atau suffix untuk memperkuat konteks input."
      />

      <div className="flex flex-col gap-8">
        <GridWrapper>
          <MainSection
            code={codePrefixText}
            title="Prefix Text"
            className="flex-1"
          >
            <InputGroup label="Website">
              <InputGroupText>https://</InputGroupText>
              <Input placeholder="your-domain.com" />
            </InputGroup>
          </MainSection>

          <MainSection code={codeCurrency} title="Sizing" className="flex-1">
            <div className="flex-column gap-2">
              <InputGroup size="sm" label="Price">
                <Select />
                <InputGroupControl>
                  <Input placeholder="0" />
                </InputGroupControl>
                <InputGroupText>IDR</InputGroupText>
              </InputGroup>
              <InputGroup size="sm" label="Price">
                <InputGroupText>IDR</InputGroupText>
                <InputGroupControl>
                  <Select />
                </InputGroupControl>
                <InputGroupText>IDR</InputGroupText>
              </InputGroup>
              <InputGroup size="md" label="Price">
                <InputGroupText>IDR</InputGroupText>
                <Input placeholder="0" />
              </InputGroup>
              <InputGroup size="lg" label="Price">
                <InputGroupText>IDR</InputGroupText>
                <Input placeholder="0" />
              </InputGroup>
            </div>
          </MainSection>

          <MainSection
            code={codeSuffixText}
            title="Suffix Text"
            className="flex-1"
          >
            <InputGroup label="Weight">
              <Input placeholder="0" />
              <InputGroupText>kg</InputGroupText>
            </InputGroup>
          </MainSection>

          <MainSection code={codeCurrency} title="Currency" className="flex-1">
            <InputGroup label="Price">
              <InputGroupText>IDR</InputGroupText>
              <Input placeholder="0" />
            </InputGroup>
          </MainSection>

          <MainSection code={codeCurrency} title="Sizing" className="flex-1">
            <div className="flex-column gap-2">
              <InputGroup size="sm" label="Price">
                <InputGroupText>IDR</InputGroupText>
                <Input placeholder="0" />
              </InputGroup>
              <InputGroup size="md" label="Price">
                <InputGroupText>IDR</InputGroupText>
                <Input placeholder="0" />
              </InputGroup>
              <InputGroup size="lg" label="Price">
                <InputGroupText>IDR</InputGroupText>
                <Input placeholder="0" />
              </InputGroup>
            </div>
          </MainSection>

          <MainSection code={codeEmail} title="Email" className="flex-1">
            <InputGroup label="Email">
              <Input placeholder="username" />
              <InputGroupText>@gmail.com</InputGroupText>
            </InputGroup>
          </MainSection>

          <MainSection code={radioBuilder} title="Radio" className="flex-1">
            <InputGroup label="Slug" size="sm">
              <Radio value="option1" />
              <Input placeholder="product-name" />
            </InputGroup>
          </MainSection>

          <MainSection code={switchExample} title="Switch" className="flex-1">
            <InputGroup label="Slug" size="sm">
              <Switch />
              <Input placeholder="product-name" />
            </InputGroup>
          </MainSection>

          <MainSection code={codePassword} title="Password" className="flex-1">
            <InputGroup label="Password">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
              />

              <Button
                variant="default"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon name={showPassword ? 'eye-open' : 'eye'} size={16} />
              </Button>
            </InputGroup>
          </MainSection>
          <MainSection code={codePhoneSelect} title="select">
            <InputGroup size="md" label="Medium">
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
          <MainSection code={codeSearch} title="Search" className="flex-1">
            <InputGroup label="Search Product">
              <InputGroupText>
                <Icon name="search" size={18} />
              </InputGroupText>

              <Input placeholder="Search..." />

              <Button color="primary"> Search </Button>
            </InputGroup>
          </MainSection>

          <MainSection code={codeOtp} title="OTP" className="flex-1">
            <InputGroup label="Verification Code">
              <Input placeholder="Enter code" />

              <Button variant="outline"> Send OTP </Button>
            </InputGroup>
          </MainSection>

          <MainSection
            code={codeKeyboardShortcut}
            title="Keyboard Shortcut"
            className="flex-1"
          >
            <InputGroup>
              <InputGroupText>
                <Icon name="table" />
              </InputGroupText>

              <Input placeholder="Type command..." />

              <InputGroupKbd> ⏎ </InputGroupKbd>
            </InputGroup>
          </MainSection>

          <MainSection
            code={codeDropdownGroup}
            title="Dropdown"
            className="flex-1"
          >
            <InputGroup>
              <InputGroupText>
                <Icon name="table" />
              </InputGroupText>

              <Input placeholder="Type command..." />
              <Dropdown>
                <DropdownTrigger>
                  <Button color="primary">Anonther</Button>
                </DropdownTrigger>
                <DropdownContent>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>
                    <div className="flex flex-wrap items-center gap-2">
                      <Icon name="user" /> Another Action
                    </div>
                  </DropdownItem>
                  <DropdownItem>Something Else</DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem>Separated Link</DropdownItem>
                </DropdownContent>
              </Dropdown>
            </InputGroup>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection
            code={codeInputActions}
            title="Input + Actions"
            className="flex-1"
          >
            <InputGroup label="Customer">
              <Input placeholder="Select customer..." />

              <Button variant="outline">
                <Icon name="user" />
              </Button>

              <Button variant="outline">
                <Icon name="plus" />
              </Button>
            </InputGroup>
          </MainSection>

          <MainSection code={codeDisabled} title="Disabled" className="flex-1">
            <InputGroup disabled label="Disabled Input">
              <InputGroupText>
                <Icon name="lock" />
              </InputGroupText>

              <Input value="Disabled value" />
            </InputGroup>
          </MainSection>

          <MainSection
            code={codeErrorState}
            title="Error State"
            className="flex-1"
          >
            <InputGroup label="Email" errorMessages="Email already exists">
              <Input placeholder="email@example.com" />
            </InputGroup>
          </MainSection>
          <MainSection code={codeFileUpload} title="file upload">
            <InputGroup>
              <InputFile
                inputFile={fileInput}
                buttonLabel={<Icon name="paperclip" />}
                buttonVariant="tertiary"
                multiple
              />
              <Input placeholder="Search..." />
              <Button onClick={() => setModal(true)} tooltip="tooltip">
                Create <Icon name="plus" size={15} />
              </Button>
            </InputGroup>
            <InputFilePreview inputFile={fileInput} mode="compact" />
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection
            code={codeWebsiteBuilder}
            title="Website Builder"
            className="flex-1"
          >
            <InputGroup>
              <Select
                options={[
                  { label: 'https://', value: 'https://' },
                  { label: 'http://', value: 'http://' },
                ]}
              />

              <Input placeholder="example.com" />
            </InputGroup>
          </MainSection>

          <MainSection
            code={codeAmountWithTax}
            title="Amount With Tax"
            className="flex-1"
          >
            <InputGroup>
              <InputGroupText>Rp</InputGroupText>

              <Input placeholder="100000" />

              <InputGroupText>+ PPN</InputGroupText>
            </InputGroup>
          </MainSection>

          <MainSection
            code={codeInvoiceSearch}
            title="Invoice Search"
            className="flex-1"
          >
            <InputGroup>
              <InputGroupText>#</InputGroupText>

              <Input placeholder="INV-2026-0001" />

              <Button color="primary">
                <Icon name="search" size={15} />
              </Button>
            </InputGroup>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection
            code={codeErpCustomer}
            title="ERP Customer Example"
            className="flex-1"
          >
            <InputGroup label="Customer">
              <InputGroupText>
                <Icon name="user" />
              </InputGroupText>

              <Input placeholder="Choose customer..." />

              <Button variant="outline">New</Button>

              <Button variant="outline"> Detail</Button>
            </InputGroup>
          </MainSection>

          <MainSection
            code={codeProductSearch}
            title="Product Search"
            className="flex-1"
          >
            <InputGroup>
              <Select
                options={[
                  { label: 'Product', value: 'product' },
                  { label: 'SKU', value: 'sku' },
                  { label: 'Category', value: 'category' },
                ]}
              />

              <Input placeholder="Search..." />

              <Button color="primary">Search</Button>
            </InputGroup>
          </MainSection>

          <MainSection
            code={codeQuickCommand}
            title="Quick Command"
            className="flex-1"
          >
            <InputGroup>
              <InputGroupText>
                <Icon name="file" />
              </InputGroupText>

              <Input placeholder="Run command..." />

              <InputGroupKbd> Ctrl </InputGroupKbd>

              <InputGroupKbd> K </InputGroupKbd>
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
