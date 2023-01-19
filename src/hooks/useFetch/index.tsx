import { useQuery } from 'react-query';

import { CollectionName } from 'model/enums/CollectionName';

import axiosInstance from 'config/axios';

import { UseApiProps } from './types';

const useFetch = <T extends Record<string, unknown> | Record<string, unknown>[]>(
  collectionName: CollectionName,
  endpoint: string,
): UseApiProps<T> => {
  const { data, error, isLoading, refetch } = useQuery<T>(collectionName, () =>
    axiosInstance.get(endpoint).then((res) => res.data),
  );

  return { data, error, isLoading, refetch };
};

export default useFetch;
