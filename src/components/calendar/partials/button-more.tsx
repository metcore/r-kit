import { Text } from '../../text';

interface Props {
  count: number;
  onClick?: () => void;
}
export default function ButtonMore({ count, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-full w-full cursor-pointer px-1 transition-colors hover:bg-gray-50"
      title={`+${count} more`}
    >
      <Text weight="medium" className="line-clamp-1 text-gray-700">
        +{count} more
      </Text>
    </button>
  );
}
