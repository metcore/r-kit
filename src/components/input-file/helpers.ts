import type { IconNameProps } from '../icons';
import { coerceType, genId } from './normalize';
import type { FileItem } from './type';

const createMockFile = ({
  name,
  type,
  sizeMb,
  hint,
  errorMessage,
  id,
}: {
  name: string;
  type: string;
  sizeMb: number;
  hint?: string;
  errorMessage?: string;
  /** Isi kalau butuh id stabil antar render (mis. dipakai sebagai `value`). */
  id?: string;
}): FileItem => {
  const bytes = Math.max(0, Math.round(sizeMb * 1024 * 1024));
  const blob = new Blob(['a'.repeat(bytes)], { type });

  const file = new File([blob], name, {
    type,
    lastModified: Date.now(),
  });

  const preview = type.startsWith('image/')
    ? 'https://picsum.photos/200' // image mock
    : 'https://placehold.co/100x120?text=PDF'; // non-image mock

  return {
    source: 'local',
    id: id ?? genId(),
    file,
    preview,
    name,
    type: coerceType(type, name),
    size: file.size,
    customName: name,
    hint,
    errorMessage,
  };
};

const getIconName = ({
  file,
  fileType,
  fileName,
}: {
  file?: File;
  fileType?: string;
  fileName?: string;
}): IconNameProps | null => {
  const type = file?.type ?? fileType;
  const ext = (file?.name ?? fileName)?.split('.').pop()?.toLowerCase();

  const hasType = type !== undefined && type !== '';

  if (hasType && type.startsWith('image/')) return null;

  if (
    (hasType && type.includes('spreadsheet')) ||
    (hasType && type.includes('ms-excel')) ||
    ext === 'xls' ||
    ext === 'xlsx'
  ) {
    return 'xls';
  }

  if (
    (hasType && type.includes('word')) ||
    (hasType && type.includes('msword')) ||
    ext === 'doc' ||
    ext === 'docx'
  ) {
    return 'doc';
  }

  if (
    (hasType && type.startsWith('video/')) ||
    ext === 'mkv' ||
    ext === 'mp4'
  ) {
    return 'mp4';
  }

  if ((hasType && type.startsWith('audio/')) || ext === 'mp3') {
    return 'mp3';
  }

  if ((hasType && type.includes('pdf')) || ext === 'pdf') {
    return 'pdf';
  }

  return 'doc';
};

export { createMockFile, getIconName };
