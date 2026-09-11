import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '../../components/button';
import { Icon } from '../../components/icons';
import CatalogIndex from '../components/CatalogIndex';
import CommandPalette, {
  useCommandPalette,
} from '../components/CommandPalette';
import ComponentShowcase from '../components/ComponentShowcase';
import Footer from '../components/Footer';
import HeroSpecimen from '../components/HeroSpecimen';
import InstallCommand from '../components/InstallCommand';
import Navbar from '../components/Navbar';
import SpecSheet from '../components/SpecSheet';
import TechLogos from '../components/TechLogos';
import { componentCount, HERCA_URL, REPO_URL } from '../data/site';
import { useLatestVersion } from '../hooks/useLatestVersion';
import { highlight } from '../lib/highlight';
import '../styles/landing.css';

/** Dua baris yang benar-benar perlu ditulis setelah install. */
const QUICKSTART_SNIPPET = `import '@herca/r-kit/style';
import { Button } from '@herca/r-kit';`;

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}): React.ReactElement {
  return (
    <div className="max-w-2xl">
      <h2 className="rk-display rk-h2">{title}</h2>
      <p className="mt-3 max-w-[64ch] text-sm leading-relaxed text-[var(--rk-ink-2)]">
        {description}
      </p>
    </div>
  );
}

export const HomePage = (): React.ReactElement => {
  const { t } = useTranslation(['landing', 'common']);
  const { open, setOpen } = useCommandPalette();
  const version = useLatestVersion();

  return (
    <div className="rk-page min-h-screen antialiased">
      <Navbar onOpenSearch={() => setOpen(true)} />
      <CommandPalette open={open} onOpenChange={setOpen} />

      <main>
        {/* Hero */}
        <section className="border-b border-[var(--rk-rule)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14">
            <div className="flex min-w-0 flex-col">
              <Link
                to="/playground"
                className="rk-hit rk-mono group flex w-fit items-center gap-2 text-[11px] tracking-[var(--rk-tracking-label)] text-[var(--rk-muted)] uppercase transition-colors duration-[var(--rk-dur-micro)] hover:text-[var(--rk-ink)]"
              >
                <span aria-hidden className="rk-tick" />
                {version != null
                  ? t('landing:hero.badge', {
                      version: `v${version}`,
                      count: componentCount,
                    })
                  : t('landing:hero.badgeFallback', { count: componentCount })}
                <span aria-hidden className="flex">
                  <Icon
                    name="arrow-right-small"
                    size={12}
                    className="transition-transform duration-[var(--rk-dur-micro)] group-hover:translate-x-0.5"
                  />
                </span>
              </Link>

              <h1 className="rk-display rk-h1 mt-5">
                {t('landing:hero.title')}
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--rk-ink-2)]">
                {t('landing:hero.subtitle')}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button asChild>
                  <Link to="/playground">{t('common:actions.playground')}</Link>
                </Button>

                <Link to="/docs" className="rk-link">
                  {t('common:actions.documentation')}
                  <span aria-hidden className="flex">
                    <Icon name="arrow-right-small" size={14} />
                  </span>
                </Link>
              </div>

              <div className="mt-8 w-full max-w-md">
                <InstallCommand />
              </div>
            </div>

            <div className="min-w-0">
              <HeroSpecimen />
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-b border-[var(--rk-rule)] bg-[var(--rk-paper-2)]">
          <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
            <TechLogos />
          </div>
        </section>

        {/* Preview komponen */}
        <section className="border-b border-[var(--rk-rule)]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <SectionHeading
              title={t('landing:preview.title')}
              description={t('landing:preview.description')}
            />

            <div className="mt-8">
              <ComponentShowcase />
            </div>
          </div>
        </section>

        {/* Katalog */}
        <section className="border-b border-[var(--rk-rule)] bg-[var(--rk-paper-2)]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <SectionHeading
              title={t('landing:catalog.title', { count: componentCount })}
              description={t('landing:catalog.description')}
            />

            <div className="mt-7">
              <CatalogIndex />
            </div>
          </div>
        </section>

        {/* Ringkasan teknis */}
        <section className="border-b border-[var(--rk-rule)]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <SectionHeading
              title={t('landing:spec.title')}
              description={t('landing:spec.description')}
            />

            <div className="mt-8 max-w-3xl">
              <SpecSheet />
            </div>
          </div>
        </section>

        {/* Instalasi */}
        <section className="rk-on-dark bg-[var(--rk-graphite)]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <h2 className="rk-display rk-display--on-dark rk-h2 max-w-xl">
              {t('landing:install.title')}
            </h2>
            <p className="mt-3 max-w-[64ch] text-sm leading-relaxed text-[var(--rk-on-graphite-2)]">
              {t('landing:install.description')}
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="min-w-0">
                <p className="rk-head-inline rk-head-inline--on-dark">
                  {t('landing:install.stepInstall')}
                </p>
                <div className="mt-2">
                  <InstallCommand tone="dark" />
                </div>
              </div>

              <div className="min-w-0">
                <p className="rk-head-inline rk-head-inline--on-dark">
                  {t('landing:install.stepImport')}
                </p>
                <pre className="rk-code mt-2 overflow-x-auto rounded-[var(--rk-radius-card)] border border-[var(--rk-graphite-rule)] bg-[var(--rk-graphite-2)] px-4 py-3.5">
                  <code>{highlight(QUICKSTART_SNIPPET)}</code>
                </pre>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--rk-graphite-rule)] pt-7">
              <Link to="/docs" className="rk-btn rk-btn--primary">
                {t('common:actions.documentation')}
              </Link>

              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rk-link rk-link--on-dark"
              >
                {t('common:actions.github')}
                <span aria-hidden className="flex">
                  <Icon name="arrow-right-small" size={14} />
                </span>
              </a>

              <p className="text-[13px] text-[var(--rk-on-graphite-2)] lg:ml-auto">
                <Trans
                  ns="landing"
                  i18nKey="install.credit"
                  components={{
                    herca: (
                      <a
                        href={HERCA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--rk-on-graphite)] underline decoration-[var(--rk-graphite-rule-strong)] underline-offset-4 transition-colors duration-[var(--rk-dur-micro)] hover:text-[var(--rk-accent-lift)] hover:decoration-[var(--rk-accent-lift)]"
                      />
                    ),
                  }}
                />
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
