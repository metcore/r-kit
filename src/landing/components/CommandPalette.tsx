import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Icon } from '../../components/icons';
import { Kbd } from '../../components/kbd';
import { cn } from '../../lib/utils';
import { useIsMac } from '../../hooks/use-is-mac';
import { componentCategories, navItems } from '../data/site';

interface CommandItem {
  name: string;
  to: string;
  category: string;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({
  open,
  onOpenChange,
}: CommandPaletteProps): React.ReactElement | null {
  const { t } = useTranslation(['common', 'landing']);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  // Label kategori ikut bahasa aktif, jadi daftar dibangun ulang saat t berubah.
  const allItems = useMemo<CommandItem[]>(
    () => [
      ...navItems.map((item) => ({
        name: t(`common:nav.${item.key}`),
        to: item.to,
        category: t('common:search.pages'),
      })),
      ...componentCategories.flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          category: t(`landing:catalog.${category.key}`),
        }))
      ),
    ],
    [t]
  );

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (normalized.length === 0) return allItems;

    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized)
    );
  }, [query, allItems]);

  // Reset ke kondisi awal setiap kali palette dibuka, lalu kembalikan fokus ke
  // elemen pemicu saat ditutup supaya navigasi keyboard tidak kehilangan tempat.
  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    setQuery('');
    setActiveIndex(0);
    inputRef.current?.focus();

    return () => openerRef.current?.focus({ preventScroll: true });
  }, [open]);

  // Jaga agar item aktif selalu terlihat saat dinavigasi dengan panah.
  useEffect(() => {
    if (!open) return;

    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  // Kunci scroll halaman selama palette terbuka.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const select = (item: CommandItem) => {
    onOpenChange(false);
    void navigate(item.to);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onOpenChange(false);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length === 0 ? 0 : (index + 1) % results.length
      );
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length === 0 ? 0 : (index - 1 + results.length) % results.length
      );
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const item = results[activeIndex];
      if (item) select(item);
    }
  };

  return (
    <div
      className="rk-cmdk fixed inset-0 z-100 flex items-start justify-center px-4 pt-[12vh]"
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        aria-label={t('common:search.close')}
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 cursor-default bg-[var(--rk-scrim)] backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('common:search.placeholder')}
        className="relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-[var(--rk-radius-card)] border border-[var(--rk-rule-2)] bg-[var(--rk-paper)]"
      >
        <div className="flex items-center gap-3 border-b border-[var(--rk-rule)] px-4">
          <span aria-hidden className="flex">
            <Icon name="search" size={16} className="text-[var(--rk-muted)]" />
          </span>

          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            placeholder={t('common:search.placeholder')}
            aria-label={t('common:search.placeholder')}
            className="rk-cmdk-input h-12 min-w-0 flex-1 bg-transparent text-sm text-[var(--rk-ink)] placeholder:text-[var(--rk-muted)]"
          />

          <Kbd size="sm" onClick={() => onOpenChange(false)}>
            esc
          </Kbd>
        </div>

        <div
          ref={listRef}
          className="scrollbar-hide flex-1 overflow-y-auto p-2"
        >
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-[var(--rk-muted)]">
              {t('common:search.empty', { query })}
            </p>
          ) : (
            results.map((item, index) => (
              <button
                key={item.to}
                type="button"
                data-active={index === activeIndex}
                onMouseMove={() => setActiveIndex(index)}
                onClick={() => select(item)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-3 rounded-[var(--rk-radius-control)] px-3 py-2 text-left transition-colors duration-[var(--rk-dur-micro)]',
                  index === activeIndex
                    ? 'bg-[var(--rk-accent-soft)]'
                    : 'bg-transparent'
                )}
              >
                <span aria-hidden className="flex">
                  <Icon
                    name="grid-square-reg"
                    size={15}
                    className={
                      index === activeIndex
                        ? 'text-[var(--rk-accent)]'
                        : 'text-[var(--rk-muted)]'
                    }
                  />
                </span>
                <span className="flex-1 truncate text-sm text-[var(--rk-ink)]">
                  {item.name}
                </span>
                <span className="rk-mono shrink-0 text-[11px] text-[var(--rk-muted)]">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="rk-mono flex items-center gap-4 border-t border-[var(--rk-rule)] bg-[var(--rk-paper-2)] px-4 py-2.5 text-[11px] text-[var(--rk-muted)]">
          <span className="flex items-center gap-1.5">
            <Kbd size="sm">↑</Kbd>
            <Kbd size="sm">↓</Kbd>
            {t('common:search.navigate')}
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd size="sm">↵</Kbd>
            {t('common:search.open')}
          </span>
          <span className="ml-auto">
            {t('common:search.results', { count: results.length })}
          </span>
        </div>
      </div>
    </div>
  );
}

export interface CommandPaletteTriggerProps {
  onClick: () => void;
  className?: string;
}

/** Tombol pemicu palette. Dipakai bersama oleh navbar landing dan header playground. */
export function CommandPaletteTrigger({
  onClick,
  className,
}: CommandPaletteTriggerProps): React.ReactElement {
  const { t } = useTranslation('common');
  const isMac = useIsMac();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t('search.trigger')}
      className={cn(
        'rk-nav-control flex h-8 shrink-0 cursor-pointer items-center gap-2 rounded-[var(--rk-radius-control)] border border-[var(--rk-rule-2)] bg-[var(--rk-paper-2)] px-2 text-[var(--rk-muted)] transition-colors duration-[var(--rk-dur-micro)] hover:border-[var(--rk-rule-strong)] hover:text-[var(--rk-ink)] sm:w-56 sm:pr-1.5 sm:pl-2.5',
        className
      )}
    >
      <span aria-hidden className="flex">
        <Icon name="search" size={14} />
      </span>
      <span className="hidden flex-1 text-left text-[13px] whitespace-nowrap sm:inline">
        {t('search.trigger')}
      </span>
      <span
        aria-hidden
        className="rk-mono hidden items-center gap-0.5 rounded-[4px] border border-[var(--rk-rule-2)] bg-[var(--rk-paper)] px-1.5 py-px text-[10px] text-[var(--rk-muted)] sm:inline-flex"
      >
        {isMac ? <Icon name="command" size={10} /> : 'Ctrl'}
        <span>K</span>
      </span>
    </button>
  );
}

/** Mendaftarkan pintasan ⌘K / Ctrl+K untuk membuka palette. */
export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'k') return;
      if (!event.metaKey && !event.ctrlKey) return;

      event.preventDefault();
      setOpen((previous) => !previous);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return { open, setOpen };
}
