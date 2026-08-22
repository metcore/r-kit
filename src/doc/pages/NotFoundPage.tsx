import { Link } from 'react-router-dom';
import { Text } from '../../components/text';
import { docHome } from '../lib/content';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-3 px-6 py-20">
      <Text as="h1" variant="h2" weight="bold" className="text-gray-900">
        Halaman tidak ditemukan
      </Text>
      <Text variant="p2" className="text-gray-700">
        Alamat yang kamu buka tidak ada di dokumentasi ini.
      </Text>
      <Link
        to={`/docs/${docHome.slug}`}
        className="text-info-600 font-medium hover:underline"
      >
        Kembali ke {docHome.title}
      </Link>
    </div>
  );
}
