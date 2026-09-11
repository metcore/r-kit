import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Icon } from '../../components/icons';
import { Text } from '../../components/text';
import DocMarkdown from '../components/DocMarkdown';
import DocPager from '../components/DocPager';
import DocToc from '../components/DocToc';
import { docBySlug, docHome, docNeighbours } from '../lib/content';
import { extractToc } from '../lib/toc';
import NotFoundPage from './NotFoundPage';

export default function DocPage() {
  const { slug } = useParams();
  const entry = slug === undefined ? docHome : docBySlug.get(slug);

  const toc = useMemo(() => (entry ? extractToc(entry.body) : []), [entry]);

  if (!entry) return <NotFoundPage />;

  const { prev, next } = docNeighbours(entry.slug);

  return (
    <div className="mx-auto flex w-full max-w-5xl gap-10 px-6 py-10">
      <article className="min-w-0 flex-1">
        <Text
          variant="t2"
          weight="medium"
          className="text-primary-1000"
          value={entry.group}
        />
        <Text
          as="h1"
          variant="h2"
          weight="bold"
          className="mt-1 text-gray-900"
          value={entry.title}
        />
        {entry.description !== '' && (
          <Text
            variant="p2"
            className="mt-2 text-gray-700"
            value={entry.description}
          />
        )}

        {entry.playground !== undefined && (
          <Link
            to={entry.playground}
            className="border-primary-200 bg-primary-50 text-primary-1000 hover:bg-primary-100 mt-4 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors"
          >
            <Icon name="grid-square" size={15} />
            Lihat demo di Playground
          </Link>
        )}

        <div className="mt-8">
          <DocMarkdown content={entry.body} />
        </div>

        <DocPager prev={prev} next={next} />
      </article>

      <DocToc items={toc} />
    </div>
  );
}
