import { useEffect, useMemo, useState } from 'react';
import { InputGroup } from '../input-group';
import { Input, type InputProps } from './input';
import { Select, type SelectGroup, type SelectOption } from '../select';
import countries from '../../assets/countries.json';
import { Text } from '../text';
import { Chip } from '../chip';

const favoriteCodes = ['ID', 'SG', 'MY'];

interface Country {
  label?: string;
  value?: string;
  flag?: string;
}

const favoriteCountries = countries
  .filter((c) => favoriteCodes.includes(c.code))
  .map((country) => ({
    label: country.name,
    value: country.dial_code,
    flag: country.flag,
  }));

const otherCountries = countries.map((country) => ({
  label: country.name,
  value: country.dial_code,
  flag: country.flag,
}));

const dataGroup: (SelectOption<Country> | SelectGroup<Country>)[] = [
  {
    label: 'Favorite',
    options: favoriteCountries,
  },
  {
    label: 'All Country',
    options: otherCountries,
  },
];

export type PhoneNumberValue = {
  dialCode?: string;
  value?: string;
};

export type InputPhoneNumberProps = Omit<InputProps, 'value' | 'onChange'> & {
  value?: PhoneNumberValue;
  onChange?: (value: PhoneNumberValue) => void;
};

function UserOptionRenderer(
  option: SelectOption,
  { selected }: { selected: boolean }
) {
  const u = option as Country;
  return (
    <Chip selected={selected} className="flex w-full flex-col items-start">
      <div className="flex gap-2">
        {u.flag}
        <Text variant="t2" weight="medium" className="text-primary-1000">
          {u.value}
        </Text>
      </div>
      <Text variant="t3" weight="medium" className="text-gray-700">
        {u.label}
      </Text>
    </Chip>
  );
}

function renderValue(option: SelectOption) {
  const u = option as Country;
  return (
    <span className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
        {u.flag}
      </span>
      <span>{u.value}</span>
    </span>
  );
}
export function InputPhoneNumber({
  label,
  value,
  onChange,
  errorMessages,
  size,
  hint,
  tooltip,
  required,
  disabled,
  clearAble = true,
  placeholder,
}: InputPhoneNumberProps): React.ReactElement {
  const [selectedDialCode, setSelectedDialCode] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const selectedFlag = useMemo(
    () =>
      otherCountries.find((option) => option.value === value?.dialCode) ?? null,
    [value?.dialCode]
  );

  const handleCodeChange = (option: SelectOption | null) => {
    setSelectedDialCode(option?.value as string);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  useEffect(() => {
    onChange?.({
      value: phoneNumber,
      dialCode: selectedDialCode,
    });
  }, [phoneNumber, selectedDialCode, onChange]);

  return (
    <InputGroup
      label={label}
      errorMessages={errorMessages}
      size={size}
      required={required}
      hint={hint}
      tooltip={tooltip}
      disabled={disabled}
    >
      <Select
        options={dataGroup}
        value={selectedFlag}
        isClearable={false}
        onChange={(v) => handleCodeChange(v as SelectOption | null)}
        renderOption={UserOptionRenderer}
        renderValue={renderValue}
      />
      <Input
        placeholder={placeholder}
        value={value?.value ?? ''}
        disabled={disabled}
        onChange={handleNumberChange}
        clearAble={clearAble}
      />
    </InputGroup>
  );
}
