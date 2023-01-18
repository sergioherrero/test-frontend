export type UseApiProps<T> = {
  data?: T;
  isLoading: boolean;
  error?: unknown;
  refetch?: () => void;
};

// export type UseApiParams<T> = {
//   notInitialized?: boolean;
//   onError?: (error?: Error) => void;
//   onSuccess?: (data?: T) => void;
// };
