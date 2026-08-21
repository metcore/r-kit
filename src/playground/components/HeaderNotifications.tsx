import { useState } from 'react';
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
import { cn } from '../../lib/utils';

interface NotificationItem {
  id: string;
  icon: IconNameProps;
  title: string;
  description: string;
  time: string;
}

const notifications: NotificationItem[] = [
  {
    id: 'release',
    icon: 'box',
    title: 'Versi 0.0.113 dirilis',
    description: 'Textarea kini punya prop clearAble dan dokumentasi baru.',
    time: '5 menit lalu',
  },
  {
    id: 'time-picker',
    icon: 'clock',
    title: 'Time Picker diperbarui',
    description: 'Label tombol bisa dikustom lewat nowLabel dan confirmLabel.',
    time: '2 jam lalu',
  },
  {
    id: 'overview',
    icon: 'grid-square',
    title: 'Halaman Overview tersedia',
    description: 'Telusuri seluruh komponen lewat katalog di halaman utama.',
    time: 'Kemarin',
  },
];

export default function HeaderNotifications() {
  const [readIds, setReadIds] = useState<string[]>([]);
  const unreadCount = notifications.length - readIds.length;

  const markAllAsRead = () => setReadIds(notifications.map((item) => item.id));

  const markAsRead = (id: string) =>
    setReadIds((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );

  return (
    <Dropdown modal={false}>
      <DropdownTrigger>
        <HeaderAction label="Notifikasi" badge={unreadCount}>
          <Icon name="bell" size={23} />
        </HeaderAction>
      </DropdownTrigger>

      <DropdownContent align="end" sideOffset={8} className="z-50 w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <Text
            variant="t1"
            weight="semibold"
            className="text-gray-900"
            value="Notifikasi"
          />
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-primary-900 cursor-pointer text-xs font-medium"
            >
              Tandai semua dibaca
            </button>
          )}
        </div>

        <DropdownSeparator className="my-0" />

        <div className="max-h-80 overflow-y-auto py-1">
          {notifications.map((item) => {
            const isRead = readIds.includes(item.id);
            return (
              <DropdownItem
                key={item.id}
                onSelect={(event) => {
                  event.preventDefault();
                  markAsRead(item.id);
                }}
                className="w-full items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50"
              >
                <span
                  className={cn(
                    'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full',
                    isRead
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-primary-100 text-primary-900'
                  )}
                >
                  <Icon name={item.icon} size={16} />
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
                  <Text
                    variant="t2"
                    weight={isRead ? 'regular' : 'semibold'}
                    className="text-gray-900"
                    value={item.title}
                  />
                  <Text
                    variant="t2"
                    className="text-gray-700"
                    value={item.description}
                  />
                  <Text
                    variant="t3"
                    className="text-gray-600"
                    value={item.time}
                  />
                </span>

                {!isRead && (
                  <span className="bg-primary-500 mt-2 size-2 shrink-0 rounded-full" />
                )}
              </DropdownItem>
            );
          })}
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
