import { Hero } from '../../components/hero';
import Alert, { type AlertColor } from '../../components/alert/alert';
import GridWrapper from '../components/GridWrapper';
import MainSection from '../components/MainSection';
import dedent from 'dedent';

const TONES: AlertColor[] = [
  'info',
  'warning',
  'success',
  'danger',
  'primary',
  'purple',
  'orange',
  'gray',
  'secondary',
];

const DESCRIPTION =
  'Lorem ipsum dolor sit amet contortuor sit amet lorem ipsum';

const TITLE = 'Title alert';

const exampleCodeAlertDefault = dedent(`
  import { Alert } from '@herca/r-kit/alert';

  export default function Example() {
    return (
      <Alert
        color="primary"
        dismissible
        title="Body alert"
      />
    );
  }
`);

const exampleCodeAlertIcon = dedent(`
  import { Alert } from '@herca/r-kit/alert';

  export default function Example() {
    return (
      <Alert
        color="primary"
        dismissible
        icon="exclamation-mark"
        title="Title alert"
      />
    );
  }
`);

const exampleCodeAlertDescription = dedent(`
  import { Alert } from '@herca/r-kit/alert';

  export default function Example() {
    return (
      <Alert
        color="primary"
        dismissible
        icon="exclamation-mark"
        title="Title alert"
        description="Lorem ipsum dolor sit amet contortuor sit amet lorem ipsum"
      />
    );
  }
`);

const exampleCodeAlertOutline = dedent(`
  import { Alert } from '@herca/r-kit/alert';

  export default function Example() {
    return (
      <Alert
        variant="outline"
        color="primary"
        dismissible
        icon="exclamation-mark"
        title="Title alert"
        description="Lorem ipsum dolor sit amet contortuor sit amet lorem ipsum"
      />
    );
  }
`);

export default function AlertPage() {
  return (
    <>
      <Hero className="mb-4">
        <p className="text-sm font-semibold text-gray-900">Feedback</p>
        <h1 className="text-3xl font-semibold text-gray-900">Alert</h1>
      </Hero>

      <div className="grid grid-cols-1 gap-4">
        <GridWrapper>
          <MainSection title="Default" code={exampleCodeAlertDefault}>
            <div className="flex flex-wrap gap-4">
              {TONES.map((t) => (
                <Alert key={t} title="body" block color={t} dismissible />
              ))}
            </div>
          </MainSection>

          <MainSection title="Alert with icon" code={exampleCodeAlertIcon}>
            <div className="flex flex-wrap gap-4">
              {TONES.map((t) => (
                <Alert
                  key={t}
                  color={t}
                  dismissible
                  icon="exclamation-mark"
                  title={TITLE}
                />
              ))}
            </div>
          </MainSection>

          <MainSection
            title="Alert with description"
            code={exampleCodeAlertDescription}
          >
            <div className="flex flex-wrap gap-4">
              {TONES.map((t) => (
                <Alert
                  key={t}
                  color={t}
                  dismissible
                  icon="exclamation-mark"
                  block={false}
                  title={TITLE}
                  description={DESCRIPTION}
                />
              ))}
            </div>
          </MainSection>

          <MainSection
            title="Alert variant outline"
            code={exampleCodeAlertOutline}
          >
            <div className="flex flex-wrap gap-4">
              {TONES.map((t) => (
                <Alert
                  key={t}
                  color={t}
                  dismissible
                  variant="outline"
                  icon="exclamation-mark"
                  title={TITLE}
                  description={DESCRIPTION}
                />
              ))}
            </div>
          </MainSection>
        </GridWrapper>
      </div>
    </>
  );
}
