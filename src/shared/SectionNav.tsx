import { Link, useLocation } from 'react-router-dom';

import { Icon, type IconNameProps } from '../components/icons';
import { cn } from '../lib/utils';

interface Bagian {
  label: string;
  to: string;
  icon: IconNameProps;
  /** Cocok bila pathname diawali salah satu awalan ini. */
  awalan: string[];
}

const BAGIAN: Bagian[] = [
  { label: 'Beranda', to: '/', icon: 'boxes', awalan: [] },
  { label: 'Docs', to: '/docs', icon: 'book-open-text', awalan: ['/docs'] },
  {
    label: 'Playground',
    to: '/playground',
    icon: 'grid-square',
    awalan: ['/playground'],
  },
];

/**
 * Penukar bagian situs: Beranda, Docs, dan Playground.
 * Dipakai di header docs maupun playground supaya keduanya tidak
 * menjadi jalan buntu.
 */
export default function SectionNav() {
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
      {BAGIAN.map((bagian) => {
        const aktif =
          bagian.awalan.length === 0
            ? pathname === '/'
            : bagian.awalan.some((a) => pathname.startsWith(a));

        return (
          <Link
            key={bagian.to}
            to={bagian.to}
            aria-current={aktif ? 'page' : undefined}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors',
              aktif
                ? 'text-primary-1000 bg-white shadow-sm'
                : 'text-gray-700 hover:text-gray-900'
            )}
          >
            <Icon name={bagian.icon} size={15} />
            <span className="hidden sm:inline">{bagian.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
