import type { Axios, AxiosResponse } from 'axios';
import { useToast } from '../toast';
import type { SelectOption } from './type';
import type { PaginatedResponse } from '../../types/api-response';

interface Props {
  axios: Axios;
}

interface AsyncLoaderProps<Data> {
  url: string;
  mapOption: (item: Data) => SelectOption;
  extraParams?: Record<string, unknown>;
  failedMessage: {
    title?: string;
    description: string;
  };
}

export const useAsyncLoader = ({ axios }: Props) => {
  const toast = useToast();

  const createAsyncLoader = <Data>({
    failedMessage,
    mapOption,
    url,
    extraParams,
  }: AsyncLoaderProps<Data>) => {
    return async ({ search, page }: { search: string; page: number }) => {
      try {
        const res: AxiosResponse<PaginatedResponse<Data>> = await axios.get(
          url,
          {
            params: {
              search,
              page,
              ...extraParams,
            },
          }
        );

        const currentPage = res.data?.data?.current_page ?? 1;
        const lastPage = res.data?.data?.last_page ?? 1;
        const items = res.data?.data?.data ?? [];

        return {
          hasMore: currentPage < lastPage,
          options: items.map(mapOption),
        };
      } catch (err) {
        console.error(err);

        toast.show({
          title: failedMessage?.title ?? 'Something Went Wrong',
          description: failedMessage.description,
          color: 'danger',
        });

        return {
          hasMore: false,
          options: [],
        };
      }
    };
  };

  return { createAsyncLoader };
};
