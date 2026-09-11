import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '../../components/icons';
import { cn } from '../../lib/utils';
import { PACKAGE_NAME } from '../data/site';

const packageManagers = [
  { id: 'npm', command: `npm install ${PACKAGE_NAME}` },
  { id: 'pnpm', command: `pnpm add ${PACKAGE_NAME}` },
  { id: 'yarn', command: `yarn add ${PACKAGE_NAME}` },
  { id: 'bun', command: `bun add ${PACKAGE_NAME}` },
] as const;

type PackageManagerId = (typeof packageManagers)[number]['id'];

export interface InstallCommandProps {
  /** `dark` dipakai di dalam pita graphite; `light` di atas paper. */
  tone?: 'light' | 'dark';
}

export default function InstallCommand({
  tone = 'light',
}: InstallCommandProps): React.ReactElement {
  const { t } = useTranslation();
  const [active, setActive] = useState<PackageManagerId>('npm');
  const [copied, setCopied] = useState(false);

  const command =
    packageManagers.find((manager) => manager.id === active)?.command ?? '';

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = () => {
    void navigator.clipboard
      .writeText(command)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  };

  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[var(--rk-radius-card)] border text-left',
        dark
          ? 'border-[var(--rk-graphite-rule)] bg-[var(--rk-graphite-2)]'
          : 'border-[var(--rk-rule)] bg-[var(--rk-paper)]'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-0.5 border-b px-1.5',
          dark
            ? 'border-[var(--rk-graphite-rule)] bg-[var(--rk-graphite)]'
            : 'border-[var(--rk-rule)] bg-[var(--rk-paper-2)]'
        )}
      >
        {packageManagers.map((manager) => (
          <button
            key={manager.id}
            type="button"
            aria-pressed={active === manager.id}
            onClick={() => setActive(manager.id)}
            className={cn(
              'rk-hit rk-mono relative cursor-pointer px-2.5 py-2 text-xs whitespace-nowrap transition-colors duration-[var(--rk-dur-micro)]',
              active === manager.id
                ? dark
                  ? 'text-[var(--rk-accent-lift)]'
                  : 'text-[var(--rk-accent)]'
                : dark
                  ? 'text-[var(--rk-on-graphite-2)] hover:text-[var(--rk-on-graphite)]'
                  : 'text-[var(--rk-muted)] hover:text-[var(--rk-ink)]'
            )}
          >
            {manager.id}
            {active === manager.id && (
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-1.5 -bottom-px h-px',
                  dark ? 'bg-[var(--rk-accent-lift)]' : 'bg-[var(--rk-accent)]'
                )}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 px-3.5 py-3">
        <span
          aria-hidden
          className={cn(
            'rk-mono text-sm select-none',
            dark ? 'text-[var(--rk-accent-lift)]' : 'text-[var(--rk-accent)]'
          )}
        >
          $
        </span>

        <code
          className={cn(
            'rk-mono flex-1 truncate text-[13px] sm:text-sm',
            dark ? 'text-[var(--rk-on-graphite)]' : 'text-[var(--rk-ink)]'
          )}
        >
          {command}
        </code>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={t('actions.copy', { command })}
          className={cn(
            'rk-hit shrink-0 cursor-pointer rounded-[var(--rk-radius-control)] p-1.5 transition-colors duration-[var(--rk-dur-micro)]',
            dark
              ? 'text-[var(--rk-on-graphite-2)] hover:bg-[var(--rk-graphite)] hover:text-[var(--rk-on-graphite)]'
              : 'text-[var(--rk-muted)] hover:bg-[var(--rk-paper-3)] hover:text-[var(--rk-ink)]'
          )}
        >
          <span aria-hidden className="flex">
            <Icon name={copied ? 'check' : 'copy-text-fill'} size={16} />
          </span>
        </button>
      </div>
    </div>
  );
}
