import dedent from 'dedent';
import { ButtonGroup, ButtonGroupItem } from '../../../components/button-group';
import { Hero } from '../../../components/hero';
import { Icon } from '../../../components/icons';
import GridWrapper from '../../components/GridWrapper';
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
export default function ButtonGroupPage() {
  return (
    <>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>
        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900">
          Button Group
        </h1>
        <p className="text-sm text-gray-800">
          Elemen interaktif utama yang digunakan untuk mengeksekusi perintah
          atau memulai alur tindakan.
        </p>
      </Hero>

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
          <MainSection title="Button Group variant">
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
          <MainSection title="Button Group Vertical">
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
      </div>
    </>
  );
}
