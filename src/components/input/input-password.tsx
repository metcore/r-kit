import { useState } from 'react';
import { Button } from '../button';
import { Icon } from '../icons';
import { InputGroup, InputGroupText } from '../input-group';
import { Input, type InputProps } from './input';

export function InputPassword({
  label,
  value,
  onChange,
  errorMessages,
  size,
  hint,
  tooltip,
  required,
  disabled,
}: InputProps): React.ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      <InputGroupText>
        <Icon name="lock" />
      </InputGroupText>
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter password"
        value={value}
        onChange={onChange}
      />

      <Button variant="tertiary" onClick={() => setShowPassword(!showPassword)}>
        <Icon name={showPassword ? 'eye-open' : 'eye'} size={16} />
      </Button>
    </InputGroup>
  );
}
