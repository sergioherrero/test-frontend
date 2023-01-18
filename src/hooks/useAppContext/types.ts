export type StateType = {
  loading: boolean;
};

export type AuthContextType = StateType & {
  setLoading: (loading: boolean) => void;
};
