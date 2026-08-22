export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Membuat anchor yang stabil dari teks heading. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Mengambil heading tingkat 2 dan 3 dari markdown.
 * Blok kode dilewati supaya komentar `##` di dalamnya tidak ikut terbaca.
 */
export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  let didalamBlokKode = false;

  for (const baris of markdown.split('\n')) {
    if (baris.trimStart().startsWith('```')) {
      didalamBlokKode = !didalamBlokKode;
      continue;
    }
    if (didalamBlokKode) continue;

    const cocok = /^(#{2,3})\s+(.+?)\s*$/.exec(baris);
    if (!cocok) continue;

    const text = cocok[2].replace(/`/g, '');
    items.push({
      id: slugify(text),
      text,
      level: cocok[1].length === 2 ? 2 : 3,
    });
  }

  return items;
}
