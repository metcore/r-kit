import { cn } from "../../lib/utils";
import { Button } from "../button";
import { Icon, type IconNameProps } from "../icons";

const ButtonNavigator = ({
  onClick,
  icon,
  className,
}: {
  onClick: () => void;
  icon: IconNameProps;
  className?: string;
}) => {
  return (
    <Button
      onClick={onClick}
      size={"icon"}
      color="gray"
      className={cn("bg-gray-500 hover:bg-gray-600", className)}
    >
      <Icon name={icon} className="h-5 w-5 text-white" />
    </Button>
  );
};

export { ButtonNavigator };
