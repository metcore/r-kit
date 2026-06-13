import { useMemo } from 'react';
import { InputGroup } from '../input-group';
import { Input, type InputProps } from './input';
import { Select, type SelectOption } from '../select';
import countries from '../../assets/countries.json';

const favoriteCodes = ['ID', 'SG', 'MY'];

const favoriteCountries = countries
  .filter((c) => favoriteCodes.includes(c.code))
  .map((country) => ({
    label: `${country.flag} ${country.name}`,
    value: country.code,
    dialCode: country.dial_code,
    flag: country.flag,
  }));

const otherCountries: SelectOption[] = countries.map((country) => ({
  label: `${country.flag} ${country.name}`,
  value: country.dial_code,
}));

const dataGroup = [
  {
    label: 'Favorite',
    options: favoriteCountries,
  },
  {
    label: 'More Country',
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
