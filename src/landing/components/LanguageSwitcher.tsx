import { useTranslation } from 'react-i18next';

import { cn } from '../../lib/utils';
import { supportedLanguages } from '../../i18n';

export interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({
  className,
}: LanguageSwitcherProps): React.ReactElement {
  const { i18n, t } = useTranslation();
  const active = i18n.resolvedLanguage ?? 'id';

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={cn(
        'flex min-h-8 shrink-0 items-center self-start rounded-[var(--rk-radius-control)] border border-[var(--rk-rule)] bg-[var(--rk-paper-2)] p-0.5',
        className
      )}
    >
      {supportedLanguages.map((language) => (
        <button
          key={language}
          type="button"
          aria-pressed={active === language}
          onClick={() => void i18n.changeLanguage(language)}
          className={cn(
            'rk-nav-control rk-mono flex cursor-pointer items-center justify-center rounded-[4px] px-2 py-0.5 text-[11px] uppercase transition-colors duration-[var(--rk-dur-micro)]',
            active === language
              ? 'bg-[var(--rk-paper)] text-[var(--rk-accent)]'
              : 'text-[var(--rk-muted)] hover:text-[var(--rk-ink)]'
          )}
        >
          {language}
        </button>
      ))}
    </div>
  );
}
