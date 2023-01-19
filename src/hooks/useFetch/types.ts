export type UseApiProps<T> = {
  data?: T;
  isLoading: boolean;
  error?: unknown;
  refetch?: () => void;
};
