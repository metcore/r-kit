import { useState } from 'react';
import { InputGroup } from '../input-group';
import { Input, type InputProps } from './input';
import { Select, type SelectOption } from '../select';
import countries from '../../assets/countries.json';

const countryOptions = countries.map((country) => ({
  label: `${country.flag} ${country.name}`,
  value: country.code,
}));
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
}: InputProps): React.ReactElement {
  const [selectedUserBasic, setSelectedUserBasic] =
    useState<SelectOption | null>(null);
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
        options={countryOptions}
        value={selectedUserBasic}
        onChange={(v) => {
          setSelectedUserBasic(v as SelectOption | null);
        }}
      />
      <Input
        placeholder="Enter password"
        value={value}
        onChange={onChange}
        clearAble={clearAble}
      />
    </InputGroup>
  );
}
