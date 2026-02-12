import { cn } from "../../lib/utils";
import { Button } from "../button";
import { DropdownItem } from "../dropdown";
import { Icon } from "../icons";
import { Text } from "../text";
import type { ButtonDropdownProps } from "./type";

const ButtonDropdown = ({ onClick }: ButtonDropdownProps) => {
  return (
    <Button
      size={"icon"}
      onClick={onClick}
      color="gray"
      className="bg-transparent transition-colors outline-none hover:bg-gray-50 focus:outline-none"
    >
      <Icon name="arrow-down" className="text-primary-1000 size-3" />
    </Button>
  );
};

const ItemDropdown = ({
  active,
  value,
  onClick,
}: {
  active: boolean;
  value: string;
  onClick: () => void;
}) => {
  return (
    <DropdownItem
      onClick={onClick}
      className={cn(
        "w-full cursor-pointer rounded-md border p-1.5 text-sm transition-colors outline-none hover:bg-gray-50",
        active ? "bg-primary-50 border-primary-300" : "border-transparent",
      )}
    >
      <Text value={value} weight="medium" />
    </DropdownItem>
  );
};

export { ButtonDropdown, ItemDropdown };
