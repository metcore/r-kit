import { useTranslation } from 'react-i18next';

/**
 * Hanya memuat logo yang bisa digambar ulang dengan tepat dari bentuk aslinya,
 * supaya tidak menampilkan lambang pihak lain versi karangan. Semuanya pakai
 * `currentColor` — halaman ini hanya punya satu warna sinyal.
 */

const ReactLogo = () => (
  <svg
    viewBox="-11.5 -10.23174 23 20.46348"
    className="h-[18px] w-[18px]"
    aria-hidden
    fill="none"
  >
    <circle r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const TypeScriptLogo = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
    <rect width="24" height="24" rx="3" fill="currentColor" />
    <text
      x="12.5"
      y="17.5"
      textAnchor="middle"
      fill="var(--rk-paper)"
      fontSize="11.5"
      fontWeight="700"
      fontFamily="var(--rk-font-mono)"
    >
      TS
    </text>
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
    <path
      fill="currentColor"
      d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12 4.8zM6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6 12z"
    />
  </svg>
);

const NpmLogo = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
    <rect width="24" height="24" rx="3" fill="currentColor" />
    <text
      x="12"
      y="15.5"
      textAnchor="middle"
      fill="var(--rk-paper)"
      fontSize="7.5"
      fontWeight="700"
      fontFamily="var(--rk-font-mono)"
    >
      npm
    </text>
  </svg>
);

const ViteLogo = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
    <path
      fill="currentColor"
      d="M23 4.5 12.6 23a.7.7 0 0 1-1.2 0L1 4.5a.7.7 0 0 1 .72-1l10.13 1.81a.7.7 0 0 0 .25 0L22.28 3.5a.7.7 0 0 1 .72 1z"
    />
    <path
      fill="var(--rk-paper)"
      d="M17 1.2 9.5 2.67a.35.35 0 0 0-.28.32l-.46 7.8a.35.35 0 0 0 .43.36l2.09-.48a.35.35 0 0 1 .42.41l-.62 3.04a.35.35 0 0 0 .42.41l1.29-.39a.35.35 0 0 1 .42.41l-.99 4.78c-.07.35.4.54.6.24l.13-.2 6.11-12.2a.35.35 0 0 0-.39-.5l-2.15.42a.35.35 0 0 1-.41-.43l1.4-4.87a.35.35 0 0 0-.42-.44z"
    />
  </svg>
);

const stack = [
  { name: 'React 19', Logo: ReactLogo },
  { name: 'TypeScript', Logo: TypeScriptLogo },
  { name: 'Tailwind v4', Logo: TailwindLogo },
  { name: 'Vite', Logo: ViteLogo },
  { name: 'npm', Logo: NpmLogo },
];

export default function TechLogos(): React.ReactElement {
  const { t } = useTranslation('landing');

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8">
      <span className="rk-head-inline">{t('tech.title')}</span>

      {stack.map(({ name, Logo }) => (
        <span
          key={name}
          className="flex items-center gap-2 text-[13px] whitespace-nowrap text-[var(--rk-ink-2)]"
        >
          <Logo />
          {name}
        </span>
      ))}
    </div>
  );
}
