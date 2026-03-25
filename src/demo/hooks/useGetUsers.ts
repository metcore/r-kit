// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from 'react';
import type { SelectOption } from '../../components/select/type';

interface FetchState<T> {
  data: T[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
}

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────

const PAGE_SIZE = 10;

const INITIAL_FETCH_STATE = <T>(): FetchState<T> => ({
  data: [],
  page: 1,
  hasMore: true,
  isLoading: false,
  isLoadingMore: false,
  error: null,
});

export default function useGetUsers() {
  /**
   * Generic paginated fetch hook.
   * `fetchPage` receives the page number and returns the next batch of items.
   * Returns the accumulated list + controls to load the next page.
   */
  function usePaginatedFetch<T>(
    fetchPage: (page: number) => Promise<T[]>,
    deps: unknown[] = []
  ) {
    const [state, setState] = useState<FetchState<T>>(INITIAL_FETCH_STATE<T>);
    // Prevent stale closures from updating state after unmount / dep change
    const abortRef = useRef<AbortController | null>(null);

    const load = useCallback(
      async (page: number, replace: boolean) => {
        abortRef.current?.abort();
        abortRef.current = new AbortController();

        setState((prev) => ({
          ...prev,
          isLoading: page === 1,
          isLoadingMore: page > 1,
          error: null,
        }));

        try {
          const batch = await fetchPage(page);
          setState((prev) => ({
            ...prev,
            data: replace ? batch : [...prev.data, ...batch],
            page,
            hasMore: batch.length === PAGE_SIZE,
            isLoading: false,
            isLoadingMore: false,
          }));
        } catch (err) {
          if ((err as Error).name === 'AbortError') return;
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isLoadingMore: false,
            error: (err as Error).message,
          }));
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      deps
    );

    // Initial load
    useEffect(() => {
      setState(INITIAL_FETCH_STATE<T>());
      void load(1, true);
      return () => abortRef.current?.abort();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    const loadMore = useCallback(() => {
      if (state.hasMore && !state.isLoading && !state.isLoadingMore) {
        void load(state.page + 1, false);
      }
    }, [state.hasMore, state.isLoading, state.isLoadingMore, state.page, load]);

    return { ...state, loadMore };
  }

  // ─────────────────────────────────────────
  // API FETCHERS
  // ─────────────────────────────────────────

  async function fetchUsers(page: number): Promise<SelectOption[]> {
    const res = await fetch(
      `https://dummyjson.com/users?limit=${PAGE_SIZE}&skip=${(page - 1) * PAGE_SIZE}`
    );

    if (!res.ok) throw new Error('Failed to fetch users');

    const json = await res.json();

    return json.users.map(
      (u: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        company: { name: string };
      }) => ({
        value: String(u.id),
        label: `${u.firstName} ${u.lastName}`,
        email: u.email,
        company: u.company?.name,
      })
    );
  }

  async function fetchPosts(
    page: number,
    userId: string | null
  ): Promise<SelectOption[]> {
    const baseUrl =
      userId !== undefined
        ? `https://dummyjson.com/posts/user/${userId}`
        : `https://dummyjson.com/posts`;

    const res = await fetch(
      `${baseUrl}?limit=${PAGE_SIZE}&skip=${(page - 1) * PAGE_SIZE}`
    );

    if (!res.ok) throw new Error('Failed to fetch posts');

    const json = await res.json();

    return json.posts.map((p: { title: string; id: number }) => ({
      value: String(p.id),
      label: p.title,
    }));
  }

  return { usePaginatedFetch, fetchUsers, fetchPosts };
}
