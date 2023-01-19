import { AxiosPromise, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { CollectionName } from 'model/enums/CollectionName';

import { UseApiProps } from './types';

const useFetch = <T extends Record<string, unknown> | Record<string, unknown>[]>(
  collectionName: CollectionName,
  apiCall: () => AxiosPromise,
): UseApiProps<T> => {
  const { data, error, isLoading, refetch } = useQuery<T>(collectionName, () =>
    apiCall().then((res: AxiosResponse) => res.data),
  );

  return { data, error, isLoading, refetch };
};

export default useFetch;
