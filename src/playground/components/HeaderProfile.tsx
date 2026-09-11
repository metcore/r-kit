import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../components/avatar';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from '../../components/dropdown';
import { HeaderAction } from '../../components/header/header';
import { Icon, type IconNameProps } from '../../components/icons';
import { Text } from '../../components/text';

interface ProfileMenuItem {
  label: string;
  icon: IconNameProps;
  to: string;
}

const menuItems: ProfileMenuItem[] = [
  { label: 'Profil', icon: 'user', to: '/playground/example/profile' },
  { label: 'Invoice', icon: 'document', to: '/playground/example/invoice' },
  { label: 'Authentication', icon: 'lock', to: '/playground/auth' },
];

export default function HeaderProfile() {
  const navigate = useNavigate();

  return (
    <Dropdown modal={false}>
      <DropdownTrigger>
        <HeaderAction label="Akun">
          <Icon name="user" size={18} />
        </HeaderAction>
      </DropdownTrigger>

      <DropdownContent align="end" sideOffset={8} className="z-50 w-64 p-0">
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar name="Nurdin Akselin" size="md" />
          <div className="flex min-w-0 flex-col">
            <Text
              variant="t2"
              weight="semibold"
              className="truncate text-gray-900"
              value="Nurdin Akselin"
            />
            <Text
              variant="t3"
              className="truncate text-gray-700"
              value="nurdin@herca.id"
            />
          </div>
        </div>

        <DropdownSeparator className="my-0" />

        <div className="px-3 py-1">
          {menuItems.map((item) => (
            <DropdownItem
              key={item.to}
              onSelect={() => void navigate(item.to)}
              className="w-full gap-2.5 rounded-lg px-3 py-2 hover:bg-gray-50"
            >
              <Icon name={item.icon} size={16} className="text-gray-700" />
              <Text variant="t2" className="text-gray-900" value={item.label} />
            </DropdownItem>
          ))}
        </div>

        <DropdownSeparator className="my-0" />

        <div className="px-3 py-1">
          <DropdownItem
            onSelect={() => void navigate('/')}
            className="hover:bg-danger-50 w-full gap-2.5 rounded-lg px-3 py-2"
          >
            <Icon name="door-closed" size={16} className="text-danger-500" />
            <Text
              variant="t2"
              className="text-danger-500"
              value="Keluar dari playground"
            />
          </DropdownItem>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
