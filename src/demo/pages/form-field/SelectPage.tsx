import { useState } from 'react';
import { Card, CardBody } from '../../../components/card';
import { Hero } from '../../../components/hero';
import { Select } from '../../../components/select';
import type { SelectOption } from '../../../components/select/type';
import DashboardLayout from '../../layouts/DashboardLayout';
import useGetUsers from '../../hooks/useGetUsers';

// ─────────────────────────────────────────
// CUSTOM OPTION RENDERERS
// ─────────────────────────────────────────

interface UserOption extends SelectOption {
  email?: string;
  company?: string;
}

function UserOptionRenderer(
  option: SelectOption,
  { selected }: { selected: boolean }
) {
  const u = option as UserOption;
  return (
    <div className="flex items-center gap-3">
      {/* Avatar initials */}
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

// ─────────────────────────────────────────
// LOADING / ERROR HELPERS
// ─────────────────────────────────────────

function StatusBadge({
  isLoading,
  isLoadingMore,
  error,
  count,
}: {
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  count: number;
}) {
  if (isLoading) return <p className="mt-2 text-xs text-gray-400">Loading…</p>;
  if (error !== null || error !== undefined)
    return <p className="mt-2 text-xs text-red-500">{error}</p>;
  if (isLoadingMore)
    return <p className="mt-2 text-xs text-gray-400">Loading more…</p>;
  return <p className="mt-2 text-xs text-gray-500">{count} options loaded</p>;
}

function SelectPage() {
  const { fetchPosts, fetchUsers, usePaginatedFetch } = useGetUsers();

  const [selectedUser, setSelectedUser] = useState<SelectOption | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>([]);
  const [selectedPost, setSelectedPost] = useState<SelectOption | null>(null);

  // ── Users (single) ──
  const users = usePaginatedFetch(fetchUsers, []);

  // ── Users (multi) ──
  const usersMulti = usePaginatedFetch(fetchUsers, []);

  // ── Posts — filtered by selected user ──
  const selectedUserId = (selectedUser as UserOption | null)?.value ?? null;
  const posts = usePaginatedFetch(
    (page) => fetchPosts(page, selectedUserId as string),
    [selectedUserId]
  );

  return (
    <DashboardLayout>
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

      <Card>
        <CardBody className="space-y-8">
          {/* ── 1. Single select + custom render ── */}
          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-700">
              1. Single Select — Users (custom render + infinite scroll)
            </h2>
            <Select
              label="User"
              options={users.data}
              value={selectedUser}
              onChange={(v) => setSelectedUser(v as SelectOption | null)}
              placeholder="Cari & pilih user…"
              renderOption={UserOptionRenderer}
              renderValue={UserValueRenderer}
              // Tell Select to call loadMore when the sentinel is visible
              onLoadMore={posts.hasMore ? users.loadMore : undefined}
              isLoadingMore={users.isLoadingMore}
            />
            <StatusBadge {...users} count={users.data.length} />
          </section>

          {/* ── 2. Multi select ── */}
          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-700">
              2. Multi Select — Users
            </h2>
            <Select
              label="Team members"
              options={usersMulti.data}
              value={selectedUsers}
              onChange={(v) => setSelectedUsers(v as SelectOption[])}
              isMulti
              placeholder="Pilih beberapa user…"
              renderOption={UserOptionRenderer}
              renderValue={UserValueRenderer}
            />
            <StatusBadge {...usersMulti} count={usersMulti.data.length} />
            {selectedUsers.length > 0 && (
              <p className="text-xs text-gray-500">
                Selected: {selectedUsers.map((u) => u.label).join(', ')}
              </p>
            )}
          </section>

          {/* ── 3. Dependent select: Posts filtered by User ── */}
          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-700">
              3. Dependent Select — Posts by selected User
            </h2>
            <p className="text-xs text-gray-400">
              Pilih user di atas terlebih dahulu, lalu pilih post milik user
              tersebut.
            </p>
            <Select
              label="Post"
              options={posts.data}
              value={selectedPost}
              onChange={(v) => setSelectedPost(v as SelectOption | null)}
              placeholder={
                selectedUser
                  ? `Pilih post dari ${selectedUser.label}…`
                  : 'Pilih user dulu…'
              }
              isDisabled={!selectedUser}
              onLoadMore={posts.hasMore ? posts.loadMore : undefined}
              isLoadingMore={posts.isLoadingMore}
            />
            <StatusBadge {...posts} count={posts.data.length} />
          </section>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}

export default SelectPage;
