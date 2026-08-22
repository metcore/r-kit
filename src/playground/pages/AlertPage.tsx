import dedent from 'dedent';
import Alert, { type AlertColor } from '../../components/alert/alert';
import illust from '../../assets/images/feedback.png';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

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
  'Perubahan tersimpan, tetapi ada dua baris yang dilewati karena formatnya tidak dikenali.';

const TITLE = 'Sebagian data dilewati';

const exampleCodeAlertDefault = dedent(`
  import { Alert } from '@herca/r-kit/alert';

  export default function Example() {
    return (
      <Alert
        color="primary"
        dismissible
        title="Perubahan tersimpan"
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
        title="Sebagian data dilewati"
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
        title="Sebagian data dilewati"
        description="Perubahan tersimpan, tetapi ada dua baris yang dilewati."
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
        title="Sebagian data dilewati"
        description="Perubahan tersimpan, tetapi ada dua baris yang dilewati."
      />
    );
  }
`);

export default function AlertPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Feedback"
        subtitle="Alert"
        description="Menyampaikan pesan status yang penting bagi user, mulai dari informasi biasa hingga peringatan kesalahan."
      />

      <div className="grid grid-cols-1 gap-4">
        <GridWrapper>
          <MainSection title="Default" code={exampleCodeAlertDefault}>
            <div className="flex flex-wrap gap-4">
              {TONES.map((t) => (
                <Alert
                  key={t}
                  title="Perubahan tersimpan"
                  block
                  color={t}
                  dismissible
                />
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

        <Footer
          title="Alert"
          backTo="/playground/sidebar"
          backToTitle="Sidebar"
          nextTo="/playground/toast"
          nextToTitle="Snackbar/Toast"
        />
      </div>
    </>
  );
}
