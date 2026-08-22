export const DOC_GROUPS = [
  'Memulai',
  'Konsep Inti',
  'Panduan',
  'Foundation',
  'Form',
  'Components',
  'Navigation',
  'Feedback',
  'Data Display',
  'Hooks',
] as const;

export type DocGroup = (typeof DOC_GROUPS)[number];

export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  group: DocGroup;
  playground?: string;
  order: number;
  body: string;
}

// Seluruh markdown dikenali saat build. Satu sumber ini melahirkan
// sidebar, pencarian, prev/next, dan isi halaman sekaligus.
const berkas = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

interface Frontmatter {
  title?: string;
  description?: string;
  group?: string;
  playground?: string;
}

function parseFrontmatter(mentah: string): {
  data: Frontmatter;
  body: string;
} {
  const cocok = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(mentah);
  if (!cocok) return { data: {}, body: mentah };

  const data: Frontmatter = {};
  for (const baris of cocok[1].split('\n')) {
    const pisah = baris.indexOf(':');
    if (pisah === -1) continue;
    const kunci = baris.slice(0, pisah).trim();
    const nilai = baris
      .slice(pisah + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
    if (nilai !== '') {
      data[kunci as keyof Frontmatter] = nilai;
    }
  }

  return { data, body: cocok[2] };
}

function bacaEntri(): DocEntry[] {
  const entri = Object.entries(berkas).map(([path, mentah]) => {
    const namaBerkas = path.split('/').pop() ?? '';
    const tanpaEkstensi = namaBerkas.replace(/\.md$/, '');
    const awalanAngka = /^(\d+)-(.*)$/.exec(tanpaEkstensi);

    const { data, body } = parseFrontmatter(mentah);
    const group = (DOC_GROUPS as readonly string[]).includes(data.group ?? '')
      ? (data.group as DocGroup)
      : 'Memulai';

    return {
      slug: awalanAngka ? awalanAngka[2] : tanpaEkstensi,
      title: data.title ?? tanpaEkstensi,
      description: data.description ?? '',
      group,
      playground: data.playground,
      // Berkas berawalan angka memakai angka itu; sisanya diurutkan
      // alfabetis lewat langkah di bawah.
      order: awalanAngka ? Number(awalanAngka[1]) : Number.NaN,
      body,
    } satisfies DocEntry;
  });

  // Entri tanpa awalan angka diberi urutan menurut posisi alfabetis judul.
  const tanpaAngka = entri
    .filter((e) => Number.isNaN(e.order))
    .sort((a, b) => a.title.localeCompare(b.title, 'id'));
  tanpaAngka.forEach((e, i) => {
    e.order = i + 1;
  });

  return entri.sort((a, b) => {
    const grup = DOC_GROUPS.indexOf(a.group) - DOC_GROUPS.indexOf(b.group);
    return grup !== 0 ? grup : a.order - b.order;
  });
}

export const docEntries: DocEntry[] = bacaEntri();

export const docBySlug = new Map(docEntries.map((e) => [e.slug, e]));

export interface DocGroupSection {
  group: DocGroup;
  entries: DocEntry[];
}

export const docSections: DocGroupSection[] = DOC_GROUPS.map((group) => ({
  group,
  entries: docEntries.filter((e) => e.group === group),
})).filter((s) => s.entries.length > 0);

/** Entri sebelum dan sesudah, mengikuti urutan sidebar. */
export function docNeighbours(slug: string): {
  prev?: DocEntry;
  next?: DocEntry;
} {
  const i = docEntries.findIndex((e) => e.slug === slug);
  if (i === -1) return {};
  return { prev: docEntries[i - 1], next: docEntries[i + 1] };
}

export const docHome = docEntries[0];
