import { useTranslation } from 'react-i18next';

import { componentCategories, componentCount } from '../data/site';
import { useLatestVersion } from '../hooks/useLatestVersion';

/**
 * Setiap nilai di bawah bisa diverifikasi dari package.json, tsup.config.ts,
 * atau registry npm.
 */
export default function SpecSheet(): React.ReactElement {
  const { t } = useTranslation('landing');
  const version = useLatestVersion();

  const rows = [
    { key: 'components', value: String(componentCount) },
    { key: 'peer', value: 'React 19' },
    { key: 'styling', value: 'Tailwind CSS v4' },
    { key: 'language', value: 'TypeScript 5.9' },
    { key: 'primitives', value: 'Radix UI' },
    { key: 'bundle', value: 'ESM + CJS' },
    { key: 'tokens', value: '@theme' },
    { key: 'license', value: 'ISC' },
    // Nilai belum ada selama request registry berjalan — em-dash, bukan tebakan.
    { key: 'version', value: version != null ? `v${version}` : '—' },
  ] as const;

  return (
    <table className="rk-mono w-full border-collapse text-left text-[13px]">
      <caption className="sr-only">{t('spec.caption')}</caption>

      <tbody>
        {rows.map((row) => (
          <tr
            key={row.key}
            className="border-t border-[var(--rk-rule)] last:border-b"
          >
            <th
              scope="row"
              className="w-[38%] py-3 pr-4 font-normal text-[var(--rk-muted)] sm:w-[30%]"
            >
              {t(`spec.${row.key}.label`)}
            </th>

            <td className="py-3 pr-4 font-medium whitespace-nowrap text-[var(--rk-ink)]">
              {row.value}
            </td>

            <td className="hidden py-3 text-[var(--rk-muted)] sm:table-cell">
              {t(`spec.${row.key}.note`, {
                categories: componentCategories.length,
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
