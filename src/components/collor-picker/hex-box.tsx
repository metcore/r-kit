import { useEffect, useState } from 'react';
import type { RGB } from './type';
import { boxBaseCls, inputBaseCls } from './constants';
import { hexToRgb } from './helpers';

interface HexBoxProps {
  hex: string;
  onCommit: (rgb: RGB) => void;
}

export default function HexBox({
  hex,
  onCommit,
}: HexBoxProps): React.ReactElement {
  const [draft, setDraft] = useState<string>(hex);
  useEffect(() => {
    setDraft(hex);
  }, [hex]);

  const commit = (): void => {
    const rgb = hexToRgb(draft);
    if (rgb) onCommit(rgb);
    else setDraft(hex);
  };

  return (
    <div className={`${boxBaseCls} flex-3 justify-center px-1`}>
      <input
        className={`${inputBaseCls} pl-1.5 text-left tracking-[0.5px]`}
        value={draft}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
        }}
      />
    </div>
  );
}
