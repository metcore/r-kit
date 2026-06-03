import { ButtonIcon } from '../../../components/button-icon/button-icon';
import { Hero } from '../../../components/hero';
import GridWrapper from '../../components/GridWrapper';
import MainSection from '../../components/MainSection';
import dedent from 'dedent';

const codeExampleBasic = dedent(`
import { ButtonIcon } from '@herca/r-kit';

export default function Example() {
  return (
    <ButtonIcon
      icon="user"
      color="primary"
    />
  );
}
`);

const codeExampleLink = dedent(`
import { ButtonIcon } from '@herca/r-kit';

export default function Example() {
  return (
    <ButtonIcon
      href="/users"
      icon="user"
      color="primary"
    />
  );
}
`);

const codeExampleColors = dedent(`
import { ButtonIcon } from '@herca/r-kit';

export default function Example() {
  return (
    <>
      <ButtonIcon icon="user" color="primary" />
      <ButtonIcon icon="user" color="secondary" />
      <ButtonIcon icon="user" color="success" />
      <ButtonIcon icon="user" color="danger" />
    </>
  );
}
`);

const codeExampleVariants = dedent(`
import { ButtonIcon } from '@herca/r-kit';

export default function Example() {
  return (
    <>
      <ButtonIcon
        icon="user"
        variant="default"
      />

      <ButtonIcon
        icon="user"
        variant="outline"
      />

      <ButtonIcon
        icon="user"
        variant="tertiary"
      />
    </>
  );
}
`);

const codeExampleSizes = dedent(`
import { ButtonIcon } from '@herca/r-kit';

export default function Example() {
  return (
    <>
      <ButtonIcon icon="user" size="sm" />
      <ButtonIcon icon="user" size="md" />
      <ButtonIcon icon="user" size="lg" />
    </>
  );
}
`);

const codeExampleLoading = dedent(`
import { ButtonIcon } from '@herca/r-kit';

export default function Example() {
  return (
    <ButtonIcon
      loading
      icon="user"
      color="primary"
    />
  );
}
`);

const codeExampleDisabled = dedent(`
import { ButtonIcon } from '@herca/r-kit';

export default function Example() {
  return (
    <ButtonIcon
      disabled
      icon="user"
      color="primary"
    />
  );
}
`);

const codeExampleActive = dedent(`
import { ButtonIcon } from '@herca/r-kit';

export default function Example() {
  return (
    <ButtonIcon
      active
      icon="user"
      color="primary"
    />
  );
}
`);

function ButtonIconPage() {
  return (
    <>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>

        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900">
          Button Icon
        </h1>

        <p className="text-sm text-gray-800">
          Tombol berbentuk ikon yang digunakan untuk aksi cepat dengan ruang
          yang lebih hemat dibanding button biasa.
        </p>
      </Hero>

      <div className="grid grid-cols-1 gap-4">
        <GridWrapper>
          <MainSection title="Basic Usage" code={codeExampleBasic}>
            <ButtonIcon icon="user" color="primary" />
          </MainSection>

          <MainSection title="As Link" code={codeExampleLink}>
            <ButtonIcon
              href="/playground/button-icon"
              icon="user"
              color="primary"
            />
          </MainSection>
        </GridWrapper>

        <MainSection title="Colors" code={codeExampleColors}>
          <div className="flex flex-wrap gap-2">
            <ButtonIcon icon="user" color="primary" />
            <ButtonIcon icon="user" color="secondary" />
            <ButtonIcon icon="user" color="success" />
            <ButtonIcon icon="user" color="danger" />
            <ButtonIcon icon="user" color="warning" />
            <ButtonIcon icon="user" color="info" />
            <ButtonIcon icon="user" color="orange" />
            <ButtonIcon icon="user" color="purple" />
            <ButtonIcon icon="user" color="gray" />
          </div>
        </MainSection>

        <GridWrapper>
          <MainSection title="Variants" code={codeExampleVariants}>
            <div className="flex gap-2">
              <ButtonIcon icon="user" color="primary" />

              <ButtonIcon icon="user" color="primary" variant="outline" />

              <ButtonIcon icon="user" color="primary" variant="tertiary" />
            </div>
          </MainSection>

          <MainSection title="Sizes" code={codeExampleSizes}>
            <div className="flex items-center gap-2">
              <ButtonIcon icon="user" size="sm" />

              <ButtonIcon icon="user" size="md" />

              <ButtonIcon icon="user" size="lg" />
            </div>
          </MainSection>

          <MainSection title="Loading" code={codeExampleLoading}>
            <ButtonIcon loading icon="user" color="primary" />
          </MainSection>

          <MainSection title="Disabled" code={codeExampleDisabled}>
            <ButtonIcon disabled icon="user" color="primary" />
          </MainSection>

          <MainSection title="Active" code={codeExampleActive}>
            <ButtonIcon active icon="user" color="primary" />
          </MainSection>
        </GridWrapper>
      </div>
    </>
  );
}

export default ButtonIconPage;
