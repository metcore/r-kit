import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import { Icon } from '../../components/icons';
import { cn } from '../../lib/utils';
import { navItems, NPM_URL, REPO_URL } from '../data/site';
import { useLatestVersion } from '../hooks/useLatestVersion';
import BrandMark from './BrandMark';
import { CommandPaletteTrigger } from './CommandPalette';
import MobileNav from './MobileNav';

export interface NavbarProps {
  onOpenSearch: () => void;
}

const GithubIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

/**
 * Di bawah `lg`, rail link horizontal turun ke `MobileNav` bersama GitHub dan
 * pemilih bahasa, supaya di 320px kontrol yang tersisa masih muat 44px.
 */
export default function Navbar({ onOpenSearch }: NavbarProps) {
  const { t } = useTranslation();
  const version = useLatestVersion();
  const [menuOpen, setMenuOpen] = useState(false);

  const railItems = navItems.filter((item) => item.key !== 'docs');

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-[var(--rk-paper-blur)] backdrop-blur-xl"
      style={{ borderColor: 'var(--rk-rule)' }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <Link
          to="/"
          className="rk-nav-control flex shrink-0 -translate-y-1 items-center"
          aria-label="r-kit"
        >
          <BrandMark size={40} className="text-[var(--rk-accent)]" />
        </Link>

        <CommandPaletteTrigger onClick={onOpenSearch} />

        <nav className="hidden items-center gap-5 lg:flex">
          {railItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rk-nav-control flex items-center text-[13px] whitespace-nowrap transition-colors duration-[var(--rk-dur-micro)]',
                  isActive
                    ? 'font-medium text-[var(--rk-accent)]'
                    : 'text-[var(--rk-ink-2)] hover:text-[var(--rk-ink)]'
                )
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {version != null && (
            <a
              href={NPM_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={t('version.npmTitle')}
              className="rk-nav-control rk-mono hidden h-8 items-center rounded-[var(--rk-radius-control)] border border-[var(--rk-rule)] px-2.5 text-[11px] whitespace-nowrap text-[var(--rk-muted)] transition-colors duration-[var(--rk-dur-micro)] hover:border-[var(--rk-rule-2)] hover:text-[var(--rk-ink)] lg:flex"
            >
              v{version}
            </a>
          )}

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('actions.github')}
            className="rk-nav-control hidden h-8 w-8 items-center justify-center rounded-[var(--rk-radius-control)] text-[var(--rk-ink-2)] transition-colors duration-[var(--rk-dur-micro)] hover:bg-[var(--rk-paper-3)] hover:text-[var(--rk-ink)] lg:flex"
          >
            <GithubIcon />
          </a>

          <Link to="/docs" className="rk-btn rk-btn--ghost rk-btn--sm">
            {t('nav.docs')}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t('nav.menu')}
            aria-expanded={menuOpen}
            className="rk-nav-control -mr-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-[var(--rk-radius-control)] text-[var(--rk-ink-2)] transition-colors duration-[var(--rk-dur-micro)] hover:bg-[var(--rk-paper-3)] hover:text-[var(--rk-ink)] lg:hidden"
          >
            <span aria-hidden className="flex">
              <Icon name="menu-left" size={18} />
            </span>
          </button>
        </div>
      </div>

      <MobileNav open={menuOpen} onOpenChange={setMenuOpen} version={version} />
    </header>
  );
}
