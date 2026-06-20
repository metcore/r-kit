import { useState } from 'react';
import { Hero } from '../../../components/hero';
import { AsyncSelect, Select } from '../../../components/select';
import type {
  SelectGroup,
  SelectOnCreateValue,
  SelectOption,
} from '../../../components/select/type';
import useGetUsers from '../../hooks/useGetUsers';
import GridWrapper from '../../components/GridWrapper';
import MainSection from '../../components/MainSection';
import {
  codeExampleAsyncSelecBasic,
  codeExampleSelectBasic,
  codeExampleSelectCreatable,
  codeExampleSelectDescription,
  codeExampleSelectDisabled,
  codeExampleSelectGroup,
  codeExampleSelectTooltip,
} from '../../../example-code/Select';
import { useToast } from '../../../clients';
const dataSingle: SelectOption<{ description?: string }>[] = [
  {
    value: '1',
    label: 'Jhon',
  },
  {
    value: '2',
    label: 'Grock',
  },
  {
    value: '3',
    label: 'Lorem',
  },
  {
    value: '4',
    label: 'Premis',
  },
];

const dataSingleWithDescription: SelectOption<{ description?: string }>[] = [
  {
    value: '1',
    label: 'Jhon',
    description: 'Jhonson creatable',
    icon: 'user',
  },
  {
    value: '3',
    label: 'Grock',
    description: 'Jhonson creatable',
  },
];

const dataGroup: (SelectOption<ExtraUser> | SelectGroup<ExtraUser>)[] = [
  {
    label: 'Jakarta',
    options: [
      { label: 'Jack', value: 'Jack', email: 'metcore2@gmail.com' },
      { label: 'lucy', value: 'Lucy', email: 'metcore2@gmail.com' },
    ],
  },
  {
    label: 'Bandung',
    options: [
      { label: 'Jack', value: 'Jack', email: 'metcore2@gmail.com' },
      { label: 'lucy', value: 'Lucy', email: 'metcore2@gmail.com' },
    ],
  },
  { label: 'Bandung', value: 'bdg', email: 'metcore2@gmail.com' },
];

interface UserOption extends SelectOption {
  email?: string;
  company?: string;
}

interface ExtraUser {
  email: string;
  company?: string;
  firstName?: string;
  lastName?: string;
  id?: string;
}

function UserOptionRenderer(
  option: SelectOption,
  { selected }: { selected: boolean }
) {
  const u = option as UserOption;
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
        {u.label
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)}
      </div>
      <div className="min-w-0">
        <p
          className={`truncate text-sm font-medium ${selected ? 'text-blue-600' : 'text-gray-900'}`}
        >
          {u.label}
        </p>
        <p className="truncate text-xs text-gray-400">{u.email}</p>
      </div>
      <span className="ml-auto shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
        {u.company}
      </span>
    </div>
  );
}

function UserValueRenderer(option: SelectOption) {
  const u = option as UserOption;
  return (
    <span className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
        {u.label
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)}
      </span>
      <span>{u.label}</span>
    </span>
  );
}

function SelectPage() {
  const toast = useToast();
  const { fetchPosts, fetchUsers, usePaginatedFetch } = useGetUsers();
  const [searchValue, setSearchValue] = useState<string>('');
  const [loadingOnCreate, setLoadingOnCreate] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<SelectOption<ExtraUser> | null>(null);
  const [selectedUserBasic, setSelectedUserBasic] =
    useState<SelectOption<ExtraUser> | null>(null);
  const [selectedUserTooltip, setSelectedUserTooltip] =
    useState<SelectOption<ExtraUser> | null>(null);
  const [selectedUserDescription, setSelectedUserDescription] =
    useState<SelectOption<ExtraUser> | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>([]);
  const [selectedUserMultiple, setSelectedUserMultiple] = useState<
    SelectOption[]
  >([]);

  const users = usePaginatedFetch(fetchUsers, []);

  const usersMulti = usePaginatedFetch(fetchUsers, []);

  const selectedUserId = (selectedUser as UserOption | null)?.value ?? null;
  const posts = usePaginatedFetch(
    (page) => fetchPosts(page, selectedUserId as string),
    [selectedUserId]
  );

  const handleOnCreate = async (val: SelectOnCreateValue) => {
    setLoadingOnCreate(true);
    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: val,
          lastName: val,
        }),
      });
      const json = await response.json();

      setSelectedUsers(
        (prev) =>
          [
            ...prev,
            {
              value: json.id,
              label: json.firstName,
            },
          ] as SelectOption[]
      );

      toast.show({
        title: 'Success!',
        description: 'User berhasil dibuat!',
        color: 'success',
      });
      setLoadingOnCreate(false);
    } catch {
      setLoadingOnCreate(false);
    }
  };

  return (
    <>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>
        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900">
          Select — Infinite Scroll
        </h1>
        <p className="text-sm text-gray-800">
          Contoh penggunaan Select dengan data dari API publik (JSONPlaceholder)
          dan infinite scroll tanpa library tambahan.
        </p>
      </Hero>

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection
            title="Basic Select"
            className="flex-1"
            code={codeExampleSelectBasic}
          >
            <Select
              className="w-40"
              options={dataSingle}
              onSearch={(e) => setSearchValue(e)}
              searchValue={searchValue}
              value={selectedUserBasic}
              onChange={(v) => {
                setSelectedUserBasic(v as SelectOption<ExtraUser> | null);
              }}
              placeholder="Cari & pilih user…"
            />
            {searchValue}
          </MainSection>
          <MainSection
            title="Select with label and Tooltip"
            className="flex-1"
            code={codeExampleSelectTooltip}
          >
            <Select
              label="User"
              options={dataSingle}
              tooltip="This is a tooltip"
              value={selectedUserTooltip}
              onChange={(v) =>
                setSelectedUserTooltip(v as SelectOption<ExtraUser> | null)
              }
              placeholder="Cari & pilih user…"
              onLoadMore={posts.hasMore ? users.loadMore : undefined}
              isLoadingMore={users.isLoadingMore}
            />
          </MainSection>
          <MainSection
            title="Select Disable"
            className="flex-1"
            code={codeExampleSelectDisabled}
          >
            <Select
              onChange={(v) =>
                setSelectedUser(v as SelectOption<ExtraUser> | null)
              }
              placeholder="Cari & pilih user…"
              disabled={true}
              isClearable
              onLoadMore={posts.hasMore ? users.loadMore : undefined}
              isLoadingMore={users.isLoadingMore}
            />
            <Select
              options={[{ label: 'Tes user', value: 1 }]}
              value={{ label: 'Tes user', value: 1 }}
              onChange={(v) =>
                setSelectedUser(v as SelectOption<ExtraUser> | null)
              }
              placeholder="Cari & pilih user…"
              disabled={true}
              isClearable
              onLoadMore={posts.hasMore ? users.loadMore : undefined}
              isLoadingMore={users.isLoadingMore}
            />
          </MainSection>
          <MainSection
            title="Select Size"
            className="flex-1"
            code={codeExampleSelectDisabled}
          >
            <Select
              onChange={(v) =>
                setSelectedUser(v as SelectOption<ExtraUser> | null)
              }
              size="sm"
              placeholder="Cari & pilih user…"
              isClearable
              onLoadMore={posts.hasMore ? users.loadMore : undefined}
              isLoadingMore={users.isLoadingMore}
            />
            <Select
              options={[{ label: 'Tes user', value: 1 }]}
              size="md"
              onChange={(v) =>
                setSelectedUser(v as SelectOption<ExtraUser> | null)
              }
              placeholder="Cari & pilih user…"
              isClearable
              onLoadMore={posts.hasMore ? users.loadMore : undefined}
              isLoadingMore={users.isLoadingMore}
            />
            <Select
              options={[{ label: 'Tes user', value: 1 }]}
              size="lg"
              onChange={(v) =>
                setSelectedUser(v as SelectOption<ExtraUser> | null)
              }
              placeholder="Cari & pilih user…"
              isClearable
              onLoadMore={posts.hasMore ? users.loadMore : undefined}
              isLoadingMore={users.isLoadingMore}
            />
          </MainSection>
          <MainSection
            title="Select with Deskripsi"
            className="flex-1"
            code={codeExampleSelectDescription}
          >
            <Select
              label="User"
              options={dataSingleWithDescription}
              value={selectedUserDescription}
              onChange={(v) =>
                setSelectedUserDescription(v as SelectOption<ExtraUser> | null)
              }
              placeholder="Cari & pilih user…"
              onLoadMore={posts.hasMore ? users.loadMore : undefined}
              isLoadingMore={users.isLoadingMore}
            />
          </MainSection>
        </GridWrapper>
        <GridWrapper>
          <MainSection
            title="Group Select"
            className="flex-1"
            code={codeExampleSelectGroup}
          >
            <Select<ExtraUser>
              label="User"
              options={dataGroup}
              value={selectedUser}
              onChange={(v) =>
                setSelectedUser(v as SelectOption<ExtraUser> | null)
              }
              placeholder="Cari & pilih user…"
              isLoadingMore={users.isLoadingMore}
            />
          </MainSection>
          <MainSection
            title="Multiple Select"
            className="flex-1"
            code={codeExampleSelectGroup}
          >
            <Select
              label="Team members"
              options={dataSingle}
              value={selectedUserMultiple}
              onChange={(v) => {
                setSelectedUserMultiple(v as SelectOption[]);
              }}
              disabled
              multiple
              placeholder="Pilih beberapa user…"
            />
            <Select
              label="Team members"
              options={dataSingle}
              value={selectedUserMultiple}
              onChange={(v) => {
                setSelectedUserMultiple(v as SelectOption[]);
              }}
              multiple
              placeholder="Pilih beberapa user…"
            />
          </MainSection>
        </GridWrapper>
        <GridWrapper>
          <MainSection
            title="Select Createable"
            className="flex-1"
            code={codeExampleSelectCreatable}
          >
            <Select
              label="Team members"
              icon="user"
              options={usersMulti.data}
              creatable={true}
              value={selectedUsers}
              loadingOnCreate={loadingOnCreate}
              onChange={(v) => {
                setSelectedUsers(v as SelectOption[]);
              }}
              multiple
              placeholder="Pilih beberapa user…"
              onCreate={handleOnCreate}
            />
          </MainSection>
          <MainSection
            title="Async Select"
            className="flex-1"
            code={codeExampleAsyncSelecBasic}
          >
            <AsyncSelect
              label="User"
              value={selectedUser}
              onChange={(v) => {
                setSelectedUser(v as SelectOption<ExtraUser> | null);
              }}
              onSearch={setSearchValue}
              searchValue={searchValue}
              placeholder="Cari & pilih user…"
              loadOptions={async ({ search, page, signal }) => {
                const limit = 10;
                const skip = page * limit;
                const res = await fetch(
                  `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`,
                  { signal }
                );
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                const json = await res.json();
                return {
                  options: json.users.map((u: ExtraUser) => ({
                    label: `${u.firstName} ${u.lastName}`,
                    value: String(u.id),
                  })),
                  hasMore: skip + json.users.length < json.total,
                };
              }}
            />
          </MainSection>
          <MainSection
            title="Custom Select"
            className="flex-1"
            code={codeExampleSelectCreatable}
          >
            <Select
              label="User"
              options={users.data}
              value={selectedUser}
              onChange={(v) =>
                setSelectedUser(v as SelectOption<ExtraUser> | null)
              }
              placeholder="Cari & pilih user…"
              renderOption={UserOptionRenderer}
              renderValue={UserValueRenderer}
              onLoadMore={posts.hasMore ? users.loadMore : undefined}
              isLoadingMore={users.isLoadingMore}
            />
          </MainSection>
        </GridWrapper>
      </div>
    </>
  );
}

export default SelectPage;
