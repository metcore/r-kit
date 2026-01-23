import dedent from "dedent";
import type { ColorType, SizeType } from "../../components/checkbox/type";

export default function useCheckboxes() {
  const CHECKBOXES: {
    id: string;
    color: ColorType;
    disabled?: boolean;
    label?: string;
    description?: string;
  }[] = [
    { id: "1", color: "primary", label: "Primary", description: "Deskripsi" },
    { id: "2", color: "danger", label: "Danger", description: "Deskripsi" },
    { id: "3", color: "success", label: "Success", description: "Deskripsi" },
    {
      id: "4",
      color: "gray",
      label: "Disabled",
      disabled: true,
      description: "Deskripsi",
    },
  ] as const;

  const SIZE_CHECKBOXES: {
    id: string;
    color: ColorType;
    size: SizeType;
    disabled?: boolean;
    label?: string;
    label2?: string;
    description?: string;
  }[] = [
    {
      id: "1",
      color: "primary",
      size: "sm",
      label: "Small Horizontal",
      label2: "Small Vertical",
      description: "Deskripsi",
    },
    {
      id: "2",
      color: "primary",
      size: "md",
      label: "Medium Horizontal",
      label2: "Medium Vertical",
      description: "Deskripsi",
    },
    {
      id: "3",
      color: "primary",
      size: "lg",
      label: "Large Horizontal",
      label2: "Large Vertical",
      description: "Deskripsi",
    },
  ] as const;

  const exampleDefault = dedent(`
    const CHECKBOXES = [
      { id: "1", color: "gray" },
      { id: "2", color: "danger" },
      { id: "3", color: "success" },
      { id: "4", color: "warning" },
      { id: "5", color: "info" },
      { id: "6", color: "purple" },
      { id: "7", color: "orange" },
      { id: "8", color: "gray", disabled: true },
    ];

    const [selected, setSelected] = useState({});

    {CHECKBOXES.map(({ id, color, disabled }) => (
      <Checkbox
        key={id}
        color={color}
        disabled={disabled}
        checked={!!selected[id]}
        onCheckedChange={(val) =>
          setSelected((prev) => ({
            ...prev,
            [id]: val,
          }))
        }
      />
    ))}
  `);

  const exampleHorizontal = dedent(`
    const [checked, setChecked] = useState(false);

    <Checkbox
      color="primary"
      checked={checked}
      onCheckedChange={setChecked}
    />
  `);

  const exampleHorizontal2 = dedent(`
    const [checked, setChecked] = useState(false);

    <Checkbox
      icon="minus"
      color="primary"
      checked={checked}
      onCheckedChange={setChecked}
    />
  `);

  const exampleDescription = dedent(`
    const [checked, setChecked] = useState(false);

    <Checkbox
      color="primary"
      description="Deskripsi"
      checked={checked}
      onCheckedChange={setChecked}
    />
  `);

  const exampleVerticalActive = dedent(`
    const [checked, setChecked] = useState(true);

    <Checkbox
      vertical
      color="primary"
      checked={checked}
      onCheckedChange={setChecked}
    />
  `);

  const exampleVerticalMinus = dedent(`
    const [checked, setChecked] = useState(true);

    <Checkbox
      vertical
      icon="minus"
      color="primary"
      checked={checked}
      onCheckedChange={setChecked}
    />
  `);

  const exampleVerticalUnActive = dedent(`
    const [checked, setChecked] = useState(false);

    <Checkbox
      vertical
      color="primary"
      checked={checked}
      onCheckedChange={setChecked}
    />
  `);

  const exampleVerticalDescription = dedent(`
    const [checked, setChecked] = useState(false);

    <Checkbox
      vertical
      color="primary"
      description="Helper text messages"
      checked={checked}
      onCheckedChange={setChecked}
    />
  `);

  return {
    CHECKBOXES,
    SIZE_CHECKBOXES,
    exampleDefault,
    exampleHorizontal,
    exampleHorizontal2,
    exampleDescription,
    exampleVerticalActive,
    exampleVerticalMinus,
    exampleVerticalUnActive,
    exampleVerticalDescription,
  };
}
