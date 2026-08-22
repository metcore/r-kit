import { Link } from 'react-router-dom';
import { Icon } from '../../components/icons';
import { Text } from '../../components/text';
import type { DocEntry } from '../lib/content';

function Tautan({ entry, arah }: { entry: DocEntry; arah: 'prev' | 'next' }) {
  const mundur = arah === 'prev';

  return (
    <Link
      to={`/docs/${entry.slug}`}
      className={`hover:border-primary-500 flex flex-1 flex-col gap-1 rounded-lg border border-gray-200 p-4 transition-colors ${
        mundur ? 'items-start' : 'items-end text-right'
      }`}
    >
      <span className="flex items-center gap-1 text-xs text-gray-600">
        {mundur && <Icon name="angle-left-small" size={14} />}
        {mundur ? 'Sebelumnya' : 'Berikutnya'}
        {!mundur && <Icon name="angle-right-small" size={14} />}
      </span>
      <Text
        variant="t2"
        weight="semibold"
        className="text-gray-900"
        value={entry.title}
      />
    </Link>
  );
}

export default function DocPager({
  prev,
  next,
}: {
  prev?: DocEntry;
  next?: DocEntry;
}) {
  if (!prev && !next) return null;

  return (
    <div className="mt-16 flex gap-4 border-t border-gray-200 pt-8">
      {prev ? <Tautan entry={prev} arah="prev" /> : <div className="flex-1" />}
      {next ? <Tautan entry={next} arah="next" /> : <div className="flex-1" />}
    </div>
  );
}
