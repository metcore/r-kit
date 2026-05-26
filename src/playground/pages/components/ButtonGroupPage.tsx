import { ButtonGroup, ButtonGroupItem } from '../../../components/button-group';
import { Hero } from '../../../components/hero';
import { Icon } from '../../../components/icons';
import GridWrapper from '../../components/GridWrapper';
import MainSection from '../../components/MainSection';

const buttonData = [
  {
    id: 1,
    label: 'Left',
  },
  {
    id: 2,
    label: 'Middle',
  },
  {
    id: 3,
    label: 'Right',
  },
];
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
        <MainSection title="Button Group Color">
          <div className="flex flex-wrap gap-4">
            <ButtonGroup color="primary">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="success">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="danger">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="warning">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="purple">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="gray">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" />
              </ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup color="info">
              {buttonData.map(({ id, label }) => (
                <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
              ))}
              <ButtonGroupItem>
                <Icon name="plus" />
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
                  <Icon name="plus" />
                </ButtonGroupItem>
              </ButtonGroup>
              <ButtonGroup variant="outline">
                {buttonData.map(({ id, label }) => (
                  <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
                ))}
                <ButtonGroupItem>
                  <Icon name="plus" />
                </ButtonGroupItem>
              </ButtonGroup>
              <ButtonGroup variant="tertiary">
                {buttonData.map(({ id, label }) => (
                  <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
                ))}
                <ButtonGroupItem>
                  <Icon name="plus" />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </MainSection>
          <MainSection title="Button Group variant">
            <div className="flex flex-wrap gap-4">
              <ButtonGroup variant="default" direction="vertical">
                {buttonData.map(({ id, label }) => (
                  <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
                ))}
                <ButtonGroupItem>
                  <Icon name="plus" />
                </ButtonGroupItem>
              </ButtonGroup>
              <ButtonGroup variant="tertiary" direction="vertical">
                {buttonData.map(({ id, label }) => (
                  <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
                ))}
                <ButtonGroupItem>
                  <Icon name="plus" />
                </ButtonGroupItem>
              </ButtonGroup>
              <ButtonGroup variant="tertiary" direction="vertical">
                {buttonData.map(({ id, label }) => (
                  <ButtonGroupItem key={id}>{label}</ButtonGroupItem>
                ))}
                <ButtonGroupItem>
                  <Icon name="plus" />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </MainSection>
        </GridWrapper>
      </div>
    </>
  );
}
