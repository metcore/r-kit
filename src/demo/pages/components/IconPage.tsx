import { useState } from 'react';
import { Input } from '../../../clients';
import { Card, CardBody, CardHeader } from '../../../components/card';
import { Hero } from '../../../components/hero';
import { Icon, type IconNameProps } from '../../../components/icons';
import { iconRegistry } from '../../../components/icons/icon-registry';
import { Text } from '../../../components/text';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function IconPage() {
  const [search, setSearch] = useState('');
  const icons = Object.entries(iconRegistry).map(([name, icon]) => ({
    name,
    icon,
  }));

  const filteredIcons = icons.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardLayout>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>
        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900">Icons</h1>
        <p className="text-sm text-gray-800">
          Elemen icon utama yang digunakan untuk menampilkan gambar.
        </p>
      </Hero>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <Text as="h3" variant="p2" weight="semibold" value="Icon List" />

          <Input
            mergedAddon
            placeholder="Search"
            leftAddonClassName="pr-0!"
            leftAddon={<Icon name="search" size={18} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardHeader>
        <CardBody className="flex w-full flex-wrap gap-4">
          {filteredIcons.map((icon, index) => (
            <div
              className="flex w-30 flex-col items-center justify-center gap-2 border py-2 *:text-center"
              key={index}
            >
              <Icon name={icon.name as IconNameProps} />
              <Text>{icon.name}</Text>
            </div>
          ))}
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
