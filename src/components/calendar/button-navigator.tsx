import { Button } from "../button";
import { Icon, type IconNameProps } from "../icons";

const ButtonNavigator = ({
  onClick,
  icon,
}: {
  onClick: () => void;
  icon: IconNameProps;
}) => {
  return (
    <Button
      onClick={onClick}
      size={"icon"}
      color="gray"
      className="bg-gray-500 hover:bg-gray-600"
    >
      <Icon name={icon} className="h-5 w-5 text-white" />
    </Button>
  );
};

export { ButtonNavigator };
