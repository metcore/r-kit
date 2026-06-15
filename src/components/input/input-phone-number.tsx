import { useMemo } from 'react';
import { InputGroup } from '../input-group';
import { Input, type InputProps } from './input';
import { Select, type SelectOption } from '../select';
import countries from '../../assets/countries.json';
import { Text } from '../text';

const favoriteCodes = ['ID', 'SG', 'MY'];

interface Country {
  name?: string;
  value?: string;
  dialCode?: string;
  flag?: string;
}

const favoriteCountries = countries
  .filter((c) => favoriteCodes.includes(c.code))
  .map((country) => ({
    name: country.name,
    value: country.dial_code,
    dialCode: country.dial_code,
    flag: country.flag,
  }));

const otherCountries: Country[] = countries.map((country) => ({
  name: country.name,
  value: country.dial_code,
  dialCode: country.dial_code,
  flag: country.flag,
}));

const dataGroup = [
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
  code?: string;
  value?: string;
};

export type InputPhoneNumberProps = Omit<InputProps, 'value' | 'onChange'> & {
  value?: PhoneNumberValue;
  onChange?: (value: PhoneNumberValue) => void;
};

function UserOptionRenderer(
  option: SelectOption
  // { selected }: { selected: boolean }
) {
  const u = option as Country;
  return (
    <div className="bg-primary-100 flex flex-col">
      <div className="flex items-center gap-2">
        {u.flag}
        <Text variant="t2" weight="medium" className="text-primary-1000">
          {u.dialCode}
        </Text>
      </div>
      <Text variant="t3" weight="medium" className="text-gray-700">
        {u.name}
      </Text>
    </div>
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
  const selectedFlag = useMemo(
    () => otherCountries.find((option) => option.value === value?.code) ?? null,
    [value?.code]
  );

  const handleCodeChange = (option: SelectOption | null) => {
    onChange?.({
      code: option?.value != null ? String(option.value) : undefined,
      value: value?.value,
    });
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ code: value?.code, value: event.target.value });
  };

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
        onChange={(v) => handleCodeChange(v as SelectOption | null)}
        renderOption={UserOptionRenderer}
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
