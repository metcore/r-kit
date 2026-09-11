import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { HERCA_URL, ISSUES_URL, NPM_URL, REPO_URL } from '../data/site';
import BrandMark from './BrandMark';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer(): React.ReactElement {
  const { t } = useTranslation();

  const links: Array<{ label: string; href: string; external?: boolean }> = [
    { label: t('actions.github'), href: REPO_URL, external: true },
    { label: 'npm', href: NPM_URL, external: true },
    { label: t('footer.links.issues'), href: ISSUES_URL, external: true },
    { label: t('nav.docs'), href: '/docs' },
    { label: t('actions.playground'), href: '/playground' },
  ];

  // Rule vertikal antar link muncul mulai md; di bawah itu link membungkus
  // sebagai baris biasa supaya tidak ada garis menggantung di tengah wrap.
  const linkClass =
    'rk-hit whitespace-nowrap text-[var(--rk-ink-2)] transition-colors duration-[var(--rk-dur-micro)] hover:text-[var(--rk-accent)] md:border-l md:border-[var(--rk-rule-2)] md:pl-4 md:first:border-l-0 md:first:pl-0';

  return (
    <footer className="border-t border-[var(--rk-rule)] bg-[var(--rk-paper)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 sm:px-6 md:flex-row md:items-center md:gap-6">
        <BrandMark size={20} className="text-[var(--rk-accent)]" />

        <p className="text-[13px] leading-relaxed text-[var(--rk-muted)]">
          <Trans
            i18nKey="footer.tagline"
            components={{
              github: (
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--rk-ink)] underline decoration-[var(--rk-rule-2)] underline-offset-4 transition-colors duration-[var(--rk-dur-micro)] hover:text-[var(--rk-accent)] hover:decoration-[var(--rk-accent)]"
                />
              ),
              herca: (
                <a
                  href={HERCA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--rk-ink)] underline decoration-[var(--rk-rule-2)] underline-offset-4 transition-colors duration-[var(--rk-dur-micro)] hover:text-[var(--rk-accent)] hover:decoration-[var(--rk-accent)]"
                />
              ),
            }}
          />
        </p>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] md:ml-auto md:gap-x-4">
          {links.map((link) =>
            link.external === true ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} className={linkClass}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        <LanguageSwitcher className="hidden lg:flex" />
      </div>
    </footer>
  );
}
