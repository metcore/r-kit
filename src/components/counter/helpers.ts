import type { CounterControllerProps } from "./type";

// normalize value to number
const normalize = (raw: string) => {
  raw = raw.replace(/,/g, ".");
  if (raw === "-") return "-";
  let cleaned = raw.replace(/[^0-9.-]/g, "");
  cleaned = cleaned.replace(/(?!^)-/g, "");
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }
  if (cleaned === "") return "0";
  const isNegative = cleaned.startsWith("-");
  if (isNegative) cleaned = cleaned.slice(1);
  if (
    cleaned.length > 1 &&
    cleaned.startsWith("0") &&
    !cleaned.startsWith("0.")
  ) {
    cleaned = cleaned.replace(/^0+/, "");
  }
  if (isNegative) cleaned = "-" + cleaned;
  return cleaned;
};

// handle keyboard arrow down and up
const handleKeyDown = ({
  e,
  canMinus,
  value,
  valueUpdater: updateValue,
}: {
  e: React.KeyboardEvent<HTMLInputElement>;
  canMinus?: boolean;
  value: string;
  valueUpdater: (value: string) => void;
}) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    const n = Number(value);
    const base = isNaN(n) ? 0 : n;
    updateValue(String(base + 1));
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    const n = Number(value);
    let next = isNaN(n) ? 0 : n - 1;

    if (!canMinus && next < 0) next = 0;

    updateValue(String(next));
  }
};

const handleIncrement = ({
  value,
  valueUpdater: updateValue,
}: CounterControllerProps) => {
  const n = parseNumber(value);
  const base = n ?? 0;
  updateValue(normalize(String(base + 1)));
};

const handleDecrement = ({
  value,
  valueUpdater: updateValue,
  canMinus,
}: CounterControllerProps & { canMinus?: boolean }) => {
  const n = parseNumber(value);
  let next = (n ?? 0) - 1;

  if (!canMinus && next < 0) next = 0;
  updateValue(normalize(String(next)));
};

const handleInputChange = ({
  e,
  valueUpdater: updateValue,
}: {
  e: React.ChangeEvent<HTMLInputElement>;
  valueUpdater: (value: string) => void;
}) => {
  const normalized = normalize(e.target.value);
  updateValue(normalized);
};

const parseNumber = (v: string) => {
  if (v === "-" || v === "." || v === "-.") return null;
  const n = Number(v);
  return isNaN(n) ? null : n;
};

export {
  normalize,
  handleKeyDown,
  handleIncrement,
  handleDecrement,
  handleInputChange,
};
