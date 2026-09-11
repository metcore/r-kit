import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Icon } from '../../components/icons';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from '../../components/sheet';
import { cn } from '../../lib/utils';
import { navItems, NPM_URL, REPO_URL } from '../data/site';
import BrandMark from './BrandMark';
import LanguageSwitcher from './LanguageSwitcher';

export interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  version: string | null;
}

/**
 * Drawer navigasi untuk mobile sampai tablet, dibangun dari `Sheet` r-kit —
 * focus trap, Esc, dan scroll lock ikut dari Radix Dialog.
 */
export default function MobileNav({
  open,
  onOpenChange,
  version,
}: MobileNavProps): React.ReactElement {
  const { t } = useTranslation();

  const externals = [
    { label: t('actions.github'), href: REPO_URL },
    { label: 'npm', href: NPM_URL },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        size="full"
        className="rk-page w-[86%] max-w-[20rem] gap-0 border-l border-[var(--rk-rule)] bg-[var(--rk-paper)] p-0 shadow-none"
      >
        <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-[var(--rk-rule)] px-4">
          <BrandMark size={24} className="text-[var(--rk-accent)]" />
          <SheetTitle className="rk-display text-[15px] leading-none">
            r-kit
          </SheetTitle>

          {version != null && (
            <span className="rk-mono ml-auto text-[11px] text-[var(--rk-muted)]">
              v{version}
            </span>
          )}

          <SheetClose
            aria-label={t('search.close')}
            className={cn(
              'flex size-11 cursor-pointer items-center justify-center rounded-[var(--rk-radius-control)]',
              'text-[var(--rk-ink-2)] transition-colors duration-[var(--rk-dur-micro)]',
              'hover:bg-[var(--rk-paper-3)] hover:text-[var(--rk-ink)]',
              version != null ? '-mr-2.5' : '-mr-2.5 ml-auto'
            )}
          >
            <span aria-hidden className="flex">
              <Icon name="times" size={18} />
            </span>
          </SheetClose>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => onOpenChange(false)}
              className={({ isActive }) =>
                cn(
                  'flex min-h-14 items-center justify-between gap-3 border-b border-[var(--rk-rule)] px-4 text-[15px]',
                  'transition-colors duration-[var(--rk-dur-micro)]',
                  isActive
                    ? 'font-medium text-[var(--rk-accent)]'
                    : 'text-[var(--rk-ink)] hover:bg-[var(--rk-paper-2)]'
                )
              }
            >
              {t(`nav.${item.key}`)}
              <span aria-hidden className="flex text-[var(--rk-muted)]">
                <Icon name="arrow-right-small" size={15} />
              </span>
            </NavLink>
          ))}

          {externals.map((external) => (
            <a
              key={external.label}
              href={external.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-between gap-3 border-b border-[var(--rk-rule)] px-4 text-[15px] text-[var(--rk-ink-2)] transition-colors duration-[var(--rk-dur-micro)] hover:bg-[var(--rk-paper-2)] hover:text-[var(--rk-ink)]"
            >
              {external.label}
              <span aria-hidden className="flex text-[var(--rk-muted)]">
                <Icon name="arrow-export" size={15} />
              </span>
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 border-t border-[var(--rk-rule)] p-4">
          <LanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
