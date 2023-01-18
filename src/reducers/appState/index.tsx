import { StateType } from 'hooks/useAppContext/types';

import { StateAction, DispatchTypes } from './types';

export const initialState: StateType = {
  loading: false,
};

// eslint-disable-next-line default-param-last
export const reducer = (state: StateType = initialState, action: StateAction): StateType => {
  const { type, payload } = action;
  switch (type) {
    case DispatchTypes.SET_LOADING:
      return { ...state, loading: payload as boolean };
    default:
      return state;
  }
};
