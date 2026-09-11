import dedent from 'dedent';
import type { SizeType } from '../../components/checkbox/type';
import type { BaseColor } from '../../components/base/type/base-color';

export default function useCheckboxes() {
  const CHECKBOXES: {
    id: string;
    color: BaseColor;
    disabled?: boolean;
    label?: string;
    description?: string;
    checked?: boolean;
  }[] = [
    { id: '1', color: 'primary', label: 'Primary', description: 'Deskripsi' },
    {
      id: '2',
      color: 'danger',
      label: 'Danger',
      description: 'Deskripsi',
      checked: true,
    },
    { id: '3', color: 'success', label: 'Success', description: 'Deskripsi' },
    {
      id: '4',
      color: 'gray',
      label: 'Disabled',
      disabled: true,
      description: 'Deskripsi',
    },
  ] as const;

  const SIZE_CHECKBOXES: {
    id: string;
    color: BaseColor;
    size: SizeType;
    disabled?: boolean;
    label?: string;
    description?: string;
    checked?: boolean;
  }[] = [
    {
      id: '1',
      color: 'primary',
      size: 'sm',
      label: 'Small',
      description: 'Deskripsi',
      checked: true,
    },
    {
      id: '2',
      color: 'success',
      size: 'md',
      label: 'Medium',
      description: 'Deskripsi',
    },
    {
      id: '3',
      color: 'danger',
      size: 'lg',
      label: 'Large',
      description: 'Deskripsi',
    },
  ] as const;

  const exampleDefault = dedent(`
    const [checked, setChecked] = useState(false);

    <Checkbox
      onChange={setChecked}
      label={checked ? 'Checked' : 'Unchecked'}
    />
  `);

  const exampleIndeterminate = dedent(`
    const [checked, setChecked] = useState(false);

    <Checkbox
      value={1}
      icon="minus"
      onChange={setChecked}
      label={checked ? 'Checked' : 'Unchecked'}
    />
  `);

  const exampleWithText = dedent(`
    <CheckboxGroup direction="horizontal" defaultValue={['3', '4']}>
      {CHECKBOXES.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id}
          label={item.label}
          color={item.color}
          disabled={item.disabled}
        />
      ))}
    </CheckboxGroup>
  `);

  const exampleWithDescription = dedent(`
    <CheckboxGroup direction="horizontal" defaultValue={['1', '2', '3', '4']}>
      {CHECKBOXES.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id}
          label={item.label}
          color={item.color}
          disabled={item.disabled}
          description={item.description}
        />
      ))}
    </CheckboxGroup>
  `);

  const exampleValidation = dedent(`
    <CheckboxGroup direction="horizontal" defaultValue={['1', '2', '3', '4']}>
      {SIZE_CHECKBOXES.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id}
          size={item.size}
          label={item.label}
          description={item.description}
          color={item.color}
          disabled={item.disabled}
          errorMessages="Invalid Text"
        />
      ))}
    </CheckboxGroup>
  `);

  const exampleSize = dedent(`
    <CheckboxGroup direction="horizontal" defaultValue={['1', '2', '3', '4']}>
      {SIZE_CHECKBOXES.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id}
          size={item.size}
          label={item.label}
          description={item.description}
          color={item.color}
          disabled={item.disabled}
        />
      ))}
    </CheckboxGroup>
  `);

  const exampleVertical = dedent(`
    <CheckboxGroup defaultValue={['1', '2', '3', '4']}>
      {SIZE_CHECKBOXES.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id}
          size={item.size}
          label={item.label}
          description={item.description}
          color={item.color}
          disabled={item.disabled}
        />
      ))}
    </CheckboxGroup>
  `);

  const exampleTooltip = dedent(`
    <CheckboxGroup defaultValue={['1', '2', '3', '4']}>
      {SIZE_CHECKBOXES.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id}
          size={item.size}
          label={item.label}
          description={item.description}
          tooltip="Tooltip Text"
          color={item.color}
          disabled={item.disabled}
        />
      ))}
    </CheckboxGroup>
  `);

  const exampleGrouping = dedent(`
    <div className="flex flex-col gap-4">
      <Checkbox label="Parent" onChange={handleOnCheckedParent} />

      <div className="ml-6 flex flex-col">
        <CheckboxGroup defaultValue={['1', '2', '3', '4']}>
          {SIZE_CHECKBOXES.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              description={item.description}
              color={item.color}
              checked={true}
              disabled={item.disabled}
            />
          ))}
        </CheckboxGroup>
      </div>
    </div>
  `);

  return {
    CHECKBOXES,
    SIZE_CHECKBOXES,
    exampleDefault,
    exampleIndeterminate,
    exampleWithText,
    exampleWithDescription,
    exampleValidation,
    exampleSize,
    exampleVertical,
    exampleTooltip,
    exampleGrouping,
  };
}
