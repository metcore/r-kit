import { useIsMobile } from '../../../clients';
import { Text } from '../../text';

interface Props {
  segments: { startCol: number; span: number }[];
  onClick?: (colIndex: number) => void;
}

export default function ButtonMore({ segments, onClick }: Props) {
  const isMobile = useIsMobile();

  return (
    <div className="col-span-7 mt-1 grid grid-cols-7">
      {Array.from({ length: 7 }, (_, colIndex) => {
        const maxVisible = isMobile ? 1 : 2;

        // Hitung berapa segment yang melewati kolom ini
        const allInCol = segments.filter(
          (seg) =>
            colIndex >= seg.startCol && colIndex < seg.startCol + seg.span
        );

        // Hitung berapa yang visible (hanya dari slice global)
        const visibleSegments = segments.slice(0, maxVisible);
        const visibleInCol = visibleSegments.filter(
          (seg) =>
            colIndex >= seg.startCol && colIndex < seg.startCol + seg.span
        );

        const hiddenCount = allInCol.length - visibleInCol.length;

        if (hiddenCount <= 0) return <div key={colIndex} />;

        return (
          <button
            type="button"
            onClick={() => onClick?.(colIndex)}
            key={colIndex}
            className="h-fit px-1"
            title={`+${hiddenCount} more`}
          >
            <Text weight="medium" className="line-clamp-1 text-gray-700">
              + {hiddenCount} more
            </Text>
          </button>
        );
      })}
    </div>
  );
}
