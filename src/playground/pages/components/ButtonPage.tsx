import { Button } from '../../../components/button';
import { Icon } from '../../../components/icons';
import { Hero } from '../../../components/hero';
import GridWrapper from '../../components/GridWrapper';
import MainSection from '../../components/MainSection';
import dedent from 'dedent';
const codeExampleButtonBasic = dedent(`
  import { Button } from '@herca/r-kit';
  return (
    <Button color="primary">Primary</Button>
  );
`);
const codeExampleButtonLink = dedent(`
import { Button } from '@herca/r-kit';

export default function Example() {
  return (
    <Button href="/users">
      Lihat Pengguna
    </Button>
  );
}
`);
const codeExampleButtonIcon = dedent(`
import { Button, Icon } from '@herca/r-kit';

export default function Example() {
  return (
    <Button className="gap-2" color="primary">
      <Icon name="plus" size={16} />
      Tambah Data
    </Button>
  );
}
`);
const codeExampleButtonLoading = dedent(`
import { Button } from '@herca/r-kit';

export default function Example() {
  return (
    <Button loading color="primary">
      Menyimpan...
    </Button>
  );
}
`);

const codeExampleButtonColors = dedent(`
import { Button } from '@herca/r-kit';

export default function Example() {
  return (
    <>
      <Button loading color="primary">
        Primary
      </Button>
      <Button loading color="secondary">
        Secondary
      </Button>
      <Button loading color="success">
        Success
      </Button>
      <Button loading color="danger">
        Danger
      </Button>
      <Button loading color="warning">
        Warning
      </Button>
      <Button loading color="info">
        Info
      </Button>
      <Button loading color="orang">
        Orang
      </Button>
      <Button loading color="purple">
        Purple
      </Button>
      <Button loading color="gray">
        Gray
      </Button>
    </>
  );
}
`);

const codeExampleButtonVariants = dedent(`
import { Button } from '@herca/r-kit';

export default function Example() {
  return (
    <>
      <Button loading variant="default">
        Default
      </Button>
      <Button loading variant="outline">
        Outline
      </Button>
      <Button loading variant="tertiary">
        Tertiary
      </Button>
    </>
  );
}
`);

const codeExampleButtonSize = dedent(`
import { Button } from '@herca/r-kit';

export default function Example() {
  return (
    <>
      <Button loading size="sm">
        Small
      </Button>
      <Button loading size="md">
        Medium
      </Button>
      <Button loading size="lg">
        Large
      </Button>
    </>
  );
}
`);

const codeExampleButtonDisabled = dedent(`
import { Button } from '@herca/r-kit';

export default function Example() {
  return (
    <>
      <Button disabled>
        Simpan
      </Button>
    </>
  );
}
`);

const codeExampleButtonActive = dedent(`
import { Button } from '@herca/r-kit';

export default function Example() {
  return (
    <>
      <Button disabled>
        Hari Ini
      </Button>
    </>
  );
}
`);
function ButtonPage() {
  return (
    <>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>
        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900"> Button</h1>
        <p className="text-sm text-gray-800">
          Elemen interaktif utama yang digunakan untuk menjalankan aksi,
          mengirim form, atau berpindah halaman.
        </p>
      </Hero>

      <div className="grid grid-cols-1 gap-4">
        <GridWrapper>
          <MainSection title="Basic Usage" code={codeExampleButtonBasic}>
            <Button
              color="primary"
              tooltip="tooltip"
              onClick={() => alert('OnClick')}
            >
              Simpan Data
            </Button>
          </MainSection>
          <MainSection title="As Link" code={codeExampleButtonLink}>
            <div className="flex flex-wrap gap-2">
              <Button href="/playground/button"> As Link</Button>
              <Button href="/playground/button" target="_blank">
                Target Blank
              </Button>
            </div>
          </MainSection>
        </GridWrapper>
        <MainSection title="Colors" code={codeExampleButtonColors}>
          <div className="flex flex-wrap gap-2">
            <Button color="primary" asChild>
              <a>Primary</a>
            </Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
            <Button color="danger">Danger</Button>
            <Button color="warning">Warning</Button>
            <Button color="info">Info</Button>
            <Button color="orange">Orange</Button>
            <Button color="purple">Purple</Button>
            <Button color="gray">Gray</Button>
          </div>
        </MainSection>
        <GridWrapper>
          <MainSection title="With Icon" code={codeExampleButtonIcon}>
            <Button className="gap-2" color="primary">
              <Icon name="plus" size={16} />
              Tambah Data
            </Button>
          </MainSection>

          <MainSection title="Variants" code={codeExampleButtonVariants}>
            <div className="flex flex-wrap gap-2">
              <Button color="primary">Default</Button>

              <Button variant="outline" color="primary">
                Outline
              </Button>

              <Button variant="tertiary" color="primary">
                Tertiary
              </Button>
            </div>
          </MainSection>

          <MainSection title="Sizes" code={codeExampleButtonSize}>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </MainSection>

          <MainSection title="Loading" code={codeExampleButtonLoading}>
            <Button loading color="primary">
              Menyimpan...
            </Button>
          </MainSection>

          <MainSection title="Disabled" code={codeExampleButtonDisabled}>
            <Button disabled color="primary">
              Simpan
            </Button>
          </MainSection>

          <MainSection title="Active" code={codeExampleButtonActive}>
            <Button active color="primary">
              Hari Ini
            </Button>
          </MainSection>
        </GridWrapper>
      </div>
    </>
  );
}
export default ButtonPage;
