import dedent from 'dedent';
import { ButtonGroup, ButtonGroupItem } from '../../../components/button-group';
import { Icon } from '../../../components/icons';
import illust from '../../../assets/images/data-display.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
import MainSection from '../../components/MainSection';

const buttonData = [
  {
    id: 1,
    label: 'Left',
    active: true,
    disabled: true,
    href: '/playground/button-group',
  },
  {
    id: 2,
    label: 'Middle',
    active: false,
    href: '/playground/button-group',
    target: '_blank',
  },
  {
    id: 3,
    label: 'Right',
    active: false,
  },
];

const codeExampleButtonGroupBasic = dedent(`
  import { ButtonGroup } from '@herca/r-kit';
`);
const exampleVariant = dedent(`
  // variant: default | outline | tertiary
  <ButtonGroup variant="outline">
    <ButtonGroupItem>Harian</ButtonGroupItem>
    <ButtonGroupItem>Mingguan</ButtonGroupItem>
    <ButtonGroupItem>
      <Icon name="plus" size={12} />
    </ButtonGroupItem>
  </ButtonGroup>
`);

const exampleVertical = dedent(`
  // direction="vertical" menumpuk tombol ke bawah,
  // berguna di sidebar atau panel sempit.
  <ButtonGroup variant="default" direction="vertical">
    <ButtonGroupItem>Harian</ButtonGroupItem>
    <ButtonGroupItem>Mingguan</ButtonGroupItem>
  </ButtonGroup>
`);

export default function ButtonGroupPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Button Group"
        description="Menyatukan beberapa button yang saling berkaitan menjadi satu kesatuan agar hubungan antar aksinya terbaca jelas."
      />

      <div className="grid grid-cols-1 gap-4">
        <GridWrapper>
          <MainSection title="Button Basic" code={codeExampleButtonGroupBasic}>
            <ButtonGroup color="primary">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
          </MainSection>
          <MainSection
            title="Button As Link"
            code={codeExampleButtonGroupBasic}
          >
            <ButtonGroup color="primary">
              {buttonData.map(({ id, label, href, target }) => (
                <ButtonGroupItem key={id} href={href} target={target}>
                  {label}
                </ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
          </MainSection>
          <MainSection
            title="Button Basic disabled"
            code={codeExampleButtonGroupBasic}
          >
            <ButtonGroup color="primary">
              {buttonData.map(({ id, label, disabled }) => (
                <ButtonGroupItem key={id} disabled={disabled}>
                  {label}
                </ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
          </MainSection>
          <MainSection
            title="Button Basic Active"
            code={codeExampleButtonGroupBasic}
          >
            <ButtonGroup color="primary">
              {buttonData.map(({ id, label, active }) => (
                <ButtonGroupItem key={id} active={active}>
                  {label}
                </ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
          </MainSection>
        </GridWrapper>

        <MainSection title="Button Color" code={codeExampleButtonGroupBasic}>
          <div className="flex flex-wrap gap-4">
            <ButtonGroup color="primary">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="secondary">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="success">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="danger">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="warning">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="purple">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="info">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="warning">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="gray">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" size={12} />
              </ButtonGroupItem>
            </ButtonGroup>
          </div>
        </MainSection>
        <GridWrapper>
          <MainSection title="Button Group variant" code={exampleVariant}>
            <div className="flex flex-wrap gap-4">
              <ButtonGroup variant="default">
                {buttonData.map(({ id, label }) => (
                  <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
                ))}
                <ButtonGroupItem>
                  <Icon name="plus" size={12} />
                </ButtonGroupItem>
              </ButtonGroup>
              <ButtonGroup variant="outline">
                {buttonData.map(({ id, label }) => (
                  <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
                ))}
                <ButtonGroupItem>
                  <Icon name="plus" size={12} />
                </ButtonGroupItem>
              </ButtonGroup>
              <ButtonGroup variant="tertiary">
                {buttonData.map(({ id, label }) => (
                  <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
                ))}
                <ButtonGroupItem>
                  <Icon name="plus" size={12} />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </MainSection>
          <MainSection title="Button Group Vertical" code={exampleVertical}>
            <div className="flex flex-wrap gap-4">
              <ButtonGroup variant="default" direction="vertical">
                {buttonData.map(({ id, label }) => (
                  <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
                ))}
                <ButtonGroupItem>
                  <Icon name="plus" size={12} />
                </ButtonGroupItem>
              </ButtonGroup>
              <ButtonGroup variant="outline" direction="vertical">
                {buttonData.map(({ id, label }) => (
                  <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
                ))}
                <ButtonGroupItem>
                  <Icon name="plus" size={12} />
                </ButtonGroupItem>
              </ButtonGroup>
              <ButtonGroup variant="tertiary" direction="vertical">
                {buttonData.map(({ id, label }) => (
                  <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
                ))}
                <ButtonGroupItem>
                  <Icon name="plus" size={12} />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </MainSection>
        </GridWrapper>

        <Footer
          title="Button Group"
          backTo="/playground/button-icon"
          backToTitle="Button Icon"
          nextTo="/playground/card"
          nextToTitle="Card"
        />
      </div>
    </>
  );
}
