import { useQuery } from 'react-query';

import { CollectionName } from 'model/enums/CollectionName';

import axiosInstance from 'config/axios';

import { UseApiProps } from './types';

const useFetch = <T extends Record<string, unknown> | Record<string, unknown>[]>(
  collectionName: CollectionName,
  endpoint: string,
): UseApiProps<T> => {
  // const [data, setData] = useState<T>();
  // const [error, setError] = useState<Error>();
  // const [isLoading, setLoading] = useState(false);

  // const call = (callParams?: unknown) => {
  //   setLoading(true);
  //   setData(undefined);
  //   setError(undefined);
  //   // eslint-disable-next-line promise/catch-or-return
  //   apiCall(callParams)
  //     .then((res) => {
  //       if (params?.onSuccess) {
  //         params.onSuccess(res.data);
  //       }
  //       setData(res.data);
  //       return res.data;
  //     })
  //     .catch((err: unknown) => {
  //       if (params?.onError) {
  //         params.onError(err as Error);
  //       }
  //       setError(err as Error);
  //       return err;
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   if (!params?.notInitialized) {
  //     call();
  //   }
  // }, []);

  // return { call, data, error, isLoading };
  const { data, error, isLoading, refetch } = useQuery(collectionName, () =>
    axiosInstance.get(endpoint).then((res) => res.data),
  );

  return { data, error, isLoading, refetch };
};

export default useFetch;
