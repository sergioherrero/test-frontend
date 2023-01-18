export enum DispatchTypes {
  SET_LOADING = 'SET_LOADING',
}

export type StateAction = {
  type: DispatchTypes | string;
  payload?: unknown;
};
