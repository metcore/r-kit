import { useEffect, useState } from 'react';
import type { TocItem } from '../lib/toc';
import { cn } from '../../lib/utils';

/**
 * Daftar isi kolom kanan. Heading yang sedang terbaca disorot dengan
 * IntersectionObserver, bukan dengan menghitung posisi scroll manual.
 */
export default function DocToc({ items }: { items: TocItem[] }) {
  const [aktif, setAktif] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const elemen = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => e !== null);

    if (elemen.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const terlihat = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (terlihat.length > 0) {
          setAktif(terlihat[0].target.id);
        }
      },
      // Fokus ke pita sempit di sepertiga atas layar supaya heading
      // yang "sedang dibaca" terasa wajar.
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    elemen.forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-6 hidden w-56 shrink-0 self-start xl:block">
      <p className="mb-3 text-xs font-semibold tracking-wide text-gray-900 uppercase">
        Di halaman ini
      </p>
      <ul className="flex flex-col gap-1 border-l border-gray-200">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                '-ml-px block border-l py-1 text-sm transition-colors',
                item.level === 3 ? 'pl-6' : 'pl-3',
                aktif === item.id
                  ? 'border-primary-1000 text-primary-1000 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
