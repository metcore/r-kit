import { useCallback, useMemo, useState } from 'react';
import { Badge } from '../../components/badge';
import HeroSection from '../components/HeroSection';
import illust from '../../assets/images/forms.png';
import MainSection from '../components/MainSection';
import { Card, CardBody, CardHeader } from '../../components/card';
import { Text } from '../../components/text';
import {
  ApiTable,
  AsyncSelect,
  ButtonIcon,
  DatePicker,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  Input,
  InputGroup,
  InputGroupText,
} from '../../clients';
import { Icon } from '../../components/icons';
import { Kbd } from '../../components/kbd';
import { useApiTable } from '../../components/api-table/use-api-table';
import type { ApiTableColumn } from '../../components/api-table/types';
import dedent from 'dedent';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  university: string;
  role: string;
  image: string;
}

interface UserFilters {
  status: string;
  user: string;
  division: string;
  approver: string;
  date: string;
  category: string;
}

interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ColumnVisibility {
  visibleColumns: ApiTableColumn<User>[];
  isVisible: (key: string) => boolean;
  isLocked: (key: string) => boolean;
  toggle: (key: string) => void;
  reset: () => void;
  hiddenKeys: string[];
}

const exampleBasicApiTable = dedent(`
  import { useMemo } from 'react';
  import {
    ApiTable,
    useApiTable,
    type ApiTableColumn,
  } from '@herca/r-kit';

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
  }

  export default function Example() {
    const columns = useMemo<ApiTableColumn<User>[]>(
      () => [
        {
          key: 'id',
          header: 'ID',
          width: '80px',
        },
        {
          key: 'firstName',
          header: 'Name',
          sortable: true,
          render: (_, row) => (
            <>
              {row.firstName} {row.lastName}
            </>
          ),
        },
        {
          key: 'email',
          header: 'Email',
          sortable: true,
        },
        {
          key: 'age',
          header: 'Age',
          sortable: true,
        },
      ],
      []
    );

    const table = useApiTable<User>({
      url: 'https://dummyjson.com/users',

      pageMode: 'offset',
      defaultPageSize: 10,

      dataPath: 'users',
      totalPath: 'total',

      urlSync: true,

      buildUrl: ({
        search,
        pageSize,
        offset,
        sortBy,
        sortOrder,
      }) => {
        const base =
          search
            ? 'https://dummyjson.com/users/search'
            : 'https://dummyjson.com/users';

        const params = new URLSearchParams();

        if (search) {
          params.set('q', search);
        }

        params.set('limit', String(pageSize));
        params.set('skip', String(offset));

        if (sortBy && sortOrder) {
          params.set('sortBy', sortBy);
          params.set('order', sortOrder);
        }

        return \`\${base}?\${params.toString()}\`;
      },
    });

    return (
      <ApiTable
        t={table}
        columns={columns}
        onRowClick={(row) => {
          console.log(row);
        }}
      />
    );
  }
`);

const exampleDynamicColumnApiTable = dedent(`
import { useMemo } from 'react';
import {
  ApiTable,
  useApiTable,
  type ApiTableColumn,
} from '@herca/r-kit';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export default function Example() {
  const columns = useMemo<ApiTableColumn<User>[]>(
    () => [
      {
        key: 'id',
        header: 'ID',
      },
      {
        key: 'firstName',
        header: 'Name',
        sortable: true,
        render: (_, row) => (
          <>
            {row.firstName} {row.lastName}
          </>
        ),
      },
      {
        key: 'email',
        header: 'Email',
      },
      {
        key: 'phone',
        header: 'Phone',
      },
      {
        key: 'role',
        header: 'Role',
      },
    ],
    []
  );

  const visibility = useColumnVisibility(columns, {
    locked: ['id'],
    defaultHidden: ['phone'],
  });

  const table = useApiTable<User>({
    url: 'https://dummyjson.com/users',
    dataPath: 'users',
    totalPath: 'total',
  });

  return (
    <>
      <button
        onClick={() => visibility.toggle('email')}
      >
        Toggle Email
      </button>

      <button
        onClick={() => visibility.toggle('phone')}
      >
        Toggle Phone
      </button>

      <ApiTable
        t={table}
        columns={visibility.visibleColumns}
      />
    </>
  );
}
`);

function useColumnVisibility(
  columns: ApiTableColumn<User>[],
  options?: {
    locked?: string[];
    defaultHidden?: string[];
  }
): ColumnVisibility {
  const lockedKey = (options?.locked ?? []).join('|');
  const locked = useMemo(() => new Set(options?.locked ?? []), [lockedKey]);

  const [hidden, setHidden] = useState<Set<string>>(
    () => new Set(options?.defaultHidden ?? [])
  );

  const isLocked = useCallback((key: string) => locked.has(key), [locked]);
  const isVisible = useCallback((key: string) => !hidden.has(key), [hidden]);

  const toggle = useCallback(
    (key: string) => {
      if (locked.has(key)) return;
      setHidden((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });
    },
    [locked]
  );

  const defaultHiddenKey = (options?.defaultHidden ?? []).join('|');
  const reset = useCallback(
    () => setHidden(new Set(options?.defaultHidden ?? [])),
    [defaultHiddenKey]
  );

  const visibleColumns = useMemo(
    () => columns.filter((c) => !hidden.has(String(c.key))),
    [columns, hidden]
  );

  return {
    visibleColumns,
    isVisible,
    isLocked,
    toggle,
    reset,
    hiddenKeys: [...hidden],
  };
}

function ColumnChooser({
  columns,
  visibility,
}: {
  columns: ApiTableColumn<User>[];
  visibility: ColumnVisibility;
}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <ButtonIcon variant="tertiary" color="gray" icon="menu-left" />
      </DropdownTrigger>
      <DropdownContent>
        <div className="flex items-center justify-between gap-4 px-3 py-1.5">
          <Text variant="t2" weight="semibold">
            Tampilkan Kolom
          </Text>
          <button
            type="button"
            className="text-xs text-slate-500 hover:text-slate-800"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              visibility.reset();
            }}
          >
            Reset
          </button>
        </div>

        {columns.map((col) => {
          const key = String(col.key);
          const locked = visibility.isLocked(key);
          const checked = visibility.isVisible(key);
          const label = typeof col.header === 'string' ? col.header : key;

          return (
            <DropdownItem
              key={key}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!locked) visibility.toggle(key);
              }}
              className={locked ? 'pointer-events-none opacity-60' : ''}
            >
              <Icon name="check" className={checked ? '' : 'opacity-0'} />
              <span>{label}</span>
              {locked && (
                <Icon name="lock-fill" className="ml-auto opacity-60" />
              )}
            </DropdownItem>
          );
        })}
      </DropdownContent>
    </Dropdown>
  );
}

export default function ApiTablePage() {
  const columns = useMemo<ApiTableColumn<User>[]>(
    () => [
      {
        key: 'id',
        header: 'ID',
        width: '64px',
        render: (_value, row) => (
          <span className="font-mono text-xs text-slate-400">#{row.id}</span>
        ),
      },
      {
        key: 'firstName',
        header: 'Name',
        sortable: true,
        render: (_value, row) => (
          <span className="font-medium text-slate-800">
            {row.firstName} {row.lastName}
          </span>
        ),
      },
      { key: 'birthDate', header: 'Birth Date', sortable: true }, // dulu: 'birthDate' OK, tapi interface-nya 'birthday'
      {
        key: 'age',
        header: 'Age',
        sortable: true,
        render: (_value, row) => <Badge>{row.age}</Badge>,
      },
      { key: 'university', header: 'University', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      {
        key: 'action',
        header: 'Action',
        align: 'right',
        render: () => (
          <Dropdown>
            <DropdownTrigger>
              <ButtonIcon variant="tertiary" color="gray" icon="hourglass" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>
                <Icon name="eye" />
                View
              </DropdownItem>
              <DropdownItem>
                <Icon name="trash-fill" />
                Delete
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        ),
      },
    ],
    []
  );

  const t = useApiTable<User, UserFilters>({
    url: 'https://dummyjson.com/users',
    pageMode: 'offset',
    defaultPageSize: 10,
    dataPath: 'users',
    totalPath: 'total',
    urlSync: true,
    defaultFilters: {
      status: '',
      user: '',
      division: '',
      approver: '',
      date: '',
      category: '',
    },
    buildUrl: ({ search, pageSize, offset, sortBy, sortOrder, filters }) => {
      const base =
        search !== ''
          ? 'https://dummyjson.com/users/search'
          : 'https://dummyjson.com/users';
      const qp = new URLSearchParams();
      if (search !== '') qp.set('q', search);
      qp.set('limit', String(pageSize));
      qp.set('skip', String(offset));
      if (sortBy != null && sortOrder != null) {
        qp.set('sortBy', sortBy);
        qp.set('order', sortOrder);
      }
      for (const [key, value] of Object.entries(filters)) {
        if (value !== '') qp.set(key, value);
      }
      return `${base}?${qp.toString()}`;
    },
  });

  const dynamicColumns = useMemo<ApiTableColumn<User>[]>(
    () => [
      {
        key: 'id',
        header: 'ID',
        width: '64px',
        render: (_value, row) => (
          <span className="font-mono text-xs text-slate-400">#{row.id}</span>
        ),
      },
      {
        key: 'firstName',
        header: 'Name',
        sortable: true,
        render: (_value, row) => (
          <span className="font-medium text-slate-800">
            {row.firstName} {row.lastName}
          </span>
        ),
      },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'phone', header: 'Phone' },
      { key: 'birthDate', header: 'Birth Date', sortable: true },
      {
        key: 'age',
        header: 'Age',
        sortable: true,
        render: (_value, row) => <Badge>{row.age}</Badge>,
      },
      { key: 'university', header: 'University', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      {
        key: 'action',
        header: 'Action',
        align: 'right',
        render: () => (
          <ButtonIcon variant="tertiary" color="gray" icon="menu-left" />
        ),
      },
    ],
    []
  );

  const visibility = useColumnVisibility(dynamicColumns, {
    locked: ['id', 'action'],
    defaultHidden: ['phone', 'role'],
  });

  const tDynamic = useApiTable<User, UserFilters>({
    url: 'https://dummyjson.com/users',
    pageMode: 'offset',
    defaultPageSize: 10,
    dataPath: 'users',
    totalPath: 'total',
    urlSync: false,
    defaultFilters: {
      status: '',
      user: '',
      division: '',
      approver: '',
      date: '',
      category: '',
    },
    buildUrl: ({ search, pageSize, offset, sortBy, sortOrder }) => {
      const base =
        search !== ''
          ? 'https://dummyjson.com/users/search'
          : 'https://dummyjson.com/users';
      const qp = new URLSearchParams();
      if (search !== '') qp.set('q', search);
      qp.set('limit', String(pageSize));
      qp.set('skip', String(offset));
      if (sortBy != null && sortOrder != null) {
        qp.set('sortBy', sortBy);
        qp.set('order', sortOrder);
      }
      return `${base}?${qp.toString()}`;
    },
  });

  return (
    <div>
      <HeroSection
        illust={illust}
        title="Data Display"
        subtitle="Table"
        description="Struktur data yang menampilkan informasi dalam format baris dan kolom untuk mendukung pemahaman dan interaksi user."
      />
      <div className="flex flex-wrap gap-2">
        <MainSection
          title="Table Basic"
          className="w-full"
          code={exampleBasicApiTable}
        >
          <Card>
            <CardHeader
              divider
              className="flex flex-wrap items-center justify-between gap-2"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Text variant="t1" weight="semibold">
                  Filter
                </Text>

                <AsyncSelect
                  value={t.filters.category}
                  className="w-50"
                  onChange={(value) => {
                    t.setFilter(
                      'category',
                      value != null ? String(value?.value) : ''
                    );
                  }}
                  placeholder="Cari & Kategori"
                  loadOptions={async ({ search, signal }) => {
                    const res = await fetch(
                      'https://dummyjson.com/products/categories',
                      { signal }
                    );
                    if (!res.ok)
                      throw new Error(`Request failed: ${res.status}`);
                    const json: Category[] = await res.json();
                    const q = search.trim().toLowerCase();
                    const filtered = q
                      ? json.filter((c) => c.name.toLowerCase().includes(q))
                      : json;
                    return {
                      options: filtered.map((c) => ({
                        label: c.name,
                        value: c.slug,
                      })),
                      hasMore: false,
                    };
                  }}
                />
                <DatePicker
                  onChange={(value) =>
                    t.setFilter('date', value == null ? '' : String(value))
                  }
                />
              </div>

              <InputGroup>
                <InputGroupText>
                  <Icon name="search" />
                </InputGroupText>
                <Input
                  value={t.searchValue}
                  placeholder="Search users…"
                  onChange={(e) => t.setSearchValue(e.target.value)}
                />
                <Kbd size="sm">
                  <Icon name="arrow-turn-down-left" size={12} />
                </Kbd>
              </InputGroup>
            </CardHeader>

            <CardBody>
              <ApiTable
                t={t}
                responsive="cards"
                columns={columns}
                onRowClick={(row) => console.log('row clicked:', row)}
                // rowOptions={(data, key, index) => {
                //   console.log('tes', data, key, index);
                //   return {
                //     className: 'bg-gray-200',
                //   };
                // }}
                showPagination={true}
              />
            </CardBody>
          </Card>
        </MainSection>

        <MainSection
          title="Dynamic Column"
          className="overflow-auto"
          code={exampleDynamicColumnApiTable}
        >
          <Card>
            <CardHeader
              divider
              className="flex flex-wrap items-center justify-between gap-2"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Text variant="t1" weight="semibold">
                  Kolom
                </Text>
                <ColumnChooser
                  columns={dynamicColumns}
                  visibility={visibility}
                />
                <Text variant="t2" className="text-slate-400">
                  {visibility.visibleColumns.length}/{dynamicColumns.length}
                  kolom
                </Text>
              </div>

              <InputGroup>
                <InputGroupText>
                  <Icon name="search" />
                </InputGroupText>
                <Input
                  value={tDynamic.searchValue}
                  placeholder="Search users…"
                  onChange={(e) => tDynamic.setSearchValue(e.target.value)}
                />
                <Kbd size="sm">
                  <Icon name="arrow-turn-down-left" size={12} />
                </Kbd>
              </InputGroup>
            </CardHeader>

            <CardBody>
              <ApiTable t={tDynamic} columns={visibility.visibleColumns} />
            </CardBody>
          </Card>
        </MainSection>
      </div>
    </div>
  );
}
