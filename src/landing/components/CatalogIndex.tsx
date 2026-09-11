import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { componentCategories } from '../data/site';

/**
 * Katalog sebagai indeks, bukan grid kartu: 54 tujuan navigasi lebih cepat
 * dibaca sebagai daftar.
 */
export default function CatalogIndex(): React.ReactElement {
  const { t } = useTranslation('landing');

  return (
    <div className="border-t border-[var(--rk-rule)]">
      {componentCategories.map((category) => (
        <section
          key={category.key}
          className="border-b border-[var(--rk-rule)] py-5"
        >
          <h3 className="rk-head-inline flex items-center gap-2">
            {t(`catalog.${category.key}`)}
            <span aria-hidden className="rk-mono text-[var(--rk-muted)]">
              {category.items.length}
            </span>
          </h3>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {category.items.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="rk-index-link">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
