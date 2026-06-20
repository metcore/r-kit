import { useState } from 'react';
import { Button } from '../button';
import { Dropdown, DropdownContent, DropdownTrigger } from '../dropdown';
import { Icon } from '../icons';
import { Input, type InputSize } from '../input';
import { InputGroup, InputGroupControl, InputGroupText } from '../input-group';
import { RollerColumn } from './roller-column';

const pad2 = (n: number) => String(n).padStart(2, '0');

const HOURS_12 = Array.from({ length: 12 }, (_, i) => String(i + 1));
const HOURS_24 = Array.from({ length: 24 }, (_, i) => pad2(i));
const MINUTES = Array.from({ length: 60 }, (_, i) => pad2(i));
const SECONDS = Array.from({ length: 60 }, (_, i) => pad2(i));
const AMPM_RAW = ['AM', 'PM'];

interface TimePickerProps {
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  showAmPm?: boolean;
  use12Hour?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  onApply?: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  hint?: string;
  tooltip?: string;
  errorMessages?: string;
  required?: boolean;
  size?: InputSize;
}

export function TimePicker({
  showHours = true,
  showMinutes = true,
  showSeconds = false,
  showAmPm = false,
  use12Hour = false,
  defaultValue,
  onChange,
  onApply,
  placeholder = 'Pilih waktu',
  disabled = false,
  label,
  hint,
  tooltip,
  errorMessages,
  required,
  size,
}: TimePickerProps) {
  const hourOpts = use12Hour ? HOURS_12 : HOURS_24;

  const parseVal = (val?: string) => {
    if (val == undefined)
      return {
        h: use12Hour ? '10' : '00',
        m: '00',
        s: '00',
        ap: 'AM' as const,
      };
    const [rawH, rawM = '00', rawS = '00'] = val.split(':');
    let s = rawS;
    let ap: 'AM' | 'PM' = 'AM';
    if (s.includes(' ')) {
      [s, ap] = s.split(' ') as [string, 'AM' | 'PM'];
    }
    return { h: Number(rawH) || '00', m: rawM, s, ap };
  };

  const init = parseVal(defaultValue);
  const [committed, setCommitted] = useState(init);
  const [draft, setDraft] = useState(init);
  const [open, setOpen] = useState(false);

  const buildTime = ({ h, m, s, ap }: typeof init) => {
    const parts: string[] = [];
    if (showHours) parts.push(h);
    if (showMinutes) parts.push(m);
    if (showSeconds) parts.push(s);
    return showAmPm ? `${parts.join(':')} ${ap}` : parts.join(':');
  };

  const handleOpen = () => {
    setDraft({ ...committed });
    setOpen(true);
  };
  const handleNow = () => {
    const now = new Date();
    let h = now.getHours();
    const ap = h >= 12 ? 'PM' : 'AM';
    if (use12Hour) h = h % 12 || 12;
    setDraft({
      h: String(h),
      m: pad2(now.getMinutes()),
      s: pad2(now.getSeconds()),
      ap: ap as 'AM' | 'PM',
    });
  };
  const handleApply = () => {
    const timeStr = buildTime(draft);
    setCommitted({ ...draft });
    onChange?.(timeStr);
    onApply?.(timeStr);
    setOpen(false);
  };

  const displayValue = buildTime(committed);

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <DropdownTrigger>
        <InputGroup
          disabled={disabled}
          label={label}
          hint={hint}
          tooltip={tooltip}
          errorMessages={errorMessages}
          required={required}
          size={size}
        >
          <InputGroupText>
            <Icon name="clock" />
          </InputGroupText>
          <InputGroupControl>
            <Input
              value={displayValue}
              placeholder={placeholder}
              readOnly
              onClick={() =>
                !disabled && (open ? setOpen(false) : handleOpen())
              }
            />
          </InputGroupControl>
          <Button
            variant="tertiary"
            onClick={() => !disabled && (open ? setOpen(false) : handleOpen())}
          >
            <Icon
              name="arrow-down"
              size={15}
              className={`text-gray-700 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </Button>
        </InputGroup>
      </DropdownTrigger>

      <DropdownContent>
        <div className="flex">
          {showHours && (
            <RollerColumn
              options={hourOpts}
              value={draft.h}
              onChange={(v) => setDraft((d) => ({ ...d, h: v }))}
              width={125}
            />
          )}
          {showMinutes && (
            <RollerColumn
              options={MINUTES}
              value={draft.m}
              onChange={(v) => setDraft((d) => ({ ...d, m: v }))}
              width={125}
            />
          )}
          {showSeconds && (
            <RollerColumn
              options={SECONDS}
              value={draft.s}
              onChange={(v) => setDraft((d) => ({ ...d, s: v }))}
              width={125}
            />
          )}
          {showAmPm && (
            <RollerColumn
              options={AMPM_RAW}
              value={draft.ap}
              onChange={(v) =>
                setDraft((d) => ({ ...d, ap: v as 'AM' | 'PM' }))
              }
              width={76}
              circular
            />
          )}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-gray-100 px-5 py-3">
          <Button onClick={handleNow} variant="tertiary">
            Batalkan
          </Button>
          <Button onClick={handleApply}> Terapkan </Button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
