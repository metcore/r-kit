import { ButtonIcon } from '../../../components/button-icon/button-icon';
import illust from '../../../assets/images/data-display.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
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

const exampleIndicator = dedent(`
  // indicatorProps menempelkan lencana kecil di sudut tombol,
  // biasanya untuk jumlah notifikasi yang belum dibaca.
  <ButtonIcon
    color="gray"
    icon="bell"
    indicatorProps={{ color: 'danger', value: '22+', size: 'sm' }}
  />
`);

function ButtonIconPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Button Icon"
        description="Tombol berbentuk ikon untuk aksi cepat, hemat ruang dibanding button bertulisan."
      />

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
          <MainSection title="bulat" code={codeExampleActive}>
            <ButtonIcon icon="user" rounded color="primary" />
          </MainSection>
          <MainSection title="Indicator" code={exampleIndicator}>
            <ButtonIcon
              indicatorProps={{
                color: 'danger',
                value: '22+',
                size: 'sm',
                indicatorClassName: 'px-[1.5px]!',
              }}
              color="gray"
              icon="bell"
            />
          </MainSection>
        </GridWrapper>

        <Footer
          title="Button Icon"
          backTo="/playground/button"
          backToTitle="Button"
          nextTo="/playground/button-group"
          nextToTitle="Button Group"
        />
      </div>
    </>
  );
}

export default ButtonIconPage;
