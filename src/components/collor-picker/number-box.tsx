import { boxBaseCls, inputBaseCls } from './constants';

interface NumberBoxProps {
  value: number;
  onCommit: (value: string) => void;
  suffix?: string;
}

export default function NumberBox({
  value,
  onCommit,
  suffix,
}: NumberBoxProps): React.ReactElement {
  return (
    <div className={`${boxBaseCls} flex-1 justify-center px-1`}>
      <input
        className={`${inputBaseCls} text-center`}
        value={value}
        inputMode="numeric"
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => onCommit(e.target.value)}
      />
      {suffix != undefined ? (
        <span className="ml-px text-[13px] text-[#9aa1ad]">{suffix}</span>
      ) : null}
    </div>
  );
}
